#!/usr/bin/env python3
"""
AI Content Generation Tool for EchoLegal

This tool connects to an AI API (Vincent AI or similar) to generate
legal content summaries for attorney review before publishing.

Usage:
    python ai-content-generator.py --topic "LLC formation in Delaware" --lang en
    python ai-content-generator.py --topic "E-2 visa requirements" --lang tr
    python ai-content-generator.py --question "What are the tax implications of forming an LLC?" --lang en

Environment Variables:
    AI_API_KEY: API key for the AI service
    AI_API_URL: Base URL for the AI API (default: https://api.example.com)

Output:
    Creates a draft markdown file in /content/{lang}/ with the generated content
    tagged for attorney review.
"""

import os
import sys
import argparse
import json
import requests
from datetime import datetime
from pathlib import Path
import re
import hashlib

# Configuration
AI_API_KEY = os.environ.get('AI_API_KEY', '')
AI_API_URL = os.environ.get('AI_API_URL', 'https://api.anthropic.com/v1')  # Replace with actual API
CONTENT_DIR = Path(__file__).parent.parent / 'content'
DRAFTS_DIR = CONTENT_DIR / 'drafts'

# Ensure directories exist
DRAFTS_DIR.mkdir(parents=True, exist_ok=True)
(CONTENT_DIR / 'en').mkdir(parents=True, exist_ok=True)
(CONTENT_DIR / 'tr').mkdir(parents=True, exist_ok=True)


def generate_slug(title: str) -> str:
    """Generate a URL-friendly slug from a title."""
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s_]+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')[:50]


def call_ai_api(prompt: str, context: str = '') -> dict:
    """
    Call the AI API to generate content.

    Args:
        prompt: The research question or topic
        context: Additional context for the AI

    Returns:
        dict with 'content', 'citations', and 'confidence' keys
    """
    if not AI_API_KEY:
        print("WARNING: AI_API_KEY not set. Using placeholder response.")
        return {
            'content': f"[PLACEHOLDER] Content for: {prompt}\n\nThis is a placeholder response. Set AI_API_KEY to generate real content.",
            'citations': [],
            'confidence': 0.0
        }

    # Construct the API request
    # NOTE: Modify this based on your actual AI API (Vincent AI, OpenAI, Anthropic, etc.)
    headers = {
        'Authorization': f'Bearer {AI_API_KEY}',
        'Content-Type': 'application/json',
    }

    system_prompt = """You are a legal research assistant creating content for EchoLegal,
    a bilingual (English/Turkish) legal encyclopedia for Turkish entrepreneurs in the US.

    Guidelines:
    - Provide factual, educational information only
    - Always cite sources when possible
    - Note that this is NOT legal advice
    - Be clear about jurisdictional variations
    - Flag any areas requiring attorney review
    """

    payload = {
        'model': 'claude-3-sonnet-20240229',  # Adjust based on your API
        'max_tokens': 4096,
        'system': system_prompt,
        'messages': [
            {
                'role': 'user',
                'content': f"{context}\n\nResearch Topic: {prompt}\n\nPlease provide a comprehensive summary with citations."
            }
        ]
    }

    try:
        response = requests.post(
            f"{AI_API_URL}/messages",
            headers=headers,
            json=payload,
            timeout=60
        )
        response.raise_for_status()

        data = response.json()
        content = data.get('content', [{}])[0].get('text', '')

        # Extract citations if present
        citations = re.findall(r'\[(\d+)\]:\s*(.+?)(?=\n\[|\n\n|$)', content, re.DOTALL)

        return {
            'content': content,
            'citations': [{'id': c[0], 'source': c[1].strip()} for c in citations],
            'confidence': 0.85  # Placeholder confidence score
        }

    except requests.exceptions.RequestException as e:
        print(f"API Error: {e}")
        return {
            'content': f"[ERROR] Failed to generate content: {e}",
            'citations': [],
            'confidence': 0.0
        }


def create_draft_markdown(
    title: str,
    content: str,
    lang: str,
    citations: list,
    topic_slug: str,
    confidence: float
) -> Path:
    """
    Create a draft markdown file with the generated content.

    Args:
        title: Article title
        content: Generated content
        lang: Language code ('en' or 'tr')
        citations: List of citation objects
        topic_slug: URL-friendly topic slug
        confidence: AI confidence score

    Returns:
        Path to the created draft file
    """
    timestamp = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
    draft_id = hashlib.md5(f"{title}{timestamp}".encode()).hexdigest()[:8]

    filename = f"{timestamp}_{topic_slug}_{draft_id}.md"
    filepath = DRAFTS_DIR / lang / filename
    filepath.parent.mkdir(parents=True, exist_ok=True)

    # Build frontmatter
    frontmatter = f"""---
title: "{title}"
slug: "{topic_slug}"
lang: "{lang}"
status: "draft"
requires_review: true
ai_generated: true
ai_confidence: {confidence}
created_at: "{datetime.now().isoformat()}"
reviewed_by: null
review_date: null
publish_date: null
tags: []
---

"""

    # Add review banner
    review_banner = """
> ⚠️ **DRAFT - REQUIRES ATTORNEY REVIEW**
>
> This content was generated by AI and has NOT been reviewed by a licensed attorney.
> Do not publish until reviewed and approved.

---

"""

    # Add citations section if present
    citations_section = ""
    if citations:
        citations_section = "\n\n## Sources & Citations\n\n"
        for cite in citations:
            citations_section += f"[{cite['id']}]: {cite['source']}\n"

    # Add disclaimer
    disclaimer = f"""

---

## Disclaimer

{"This content is for educational purposes only and does not constitute legal advice. Laws vary by jurisdiction and individual circumstances differ. Consult a licensed attorney before relying on this information." if lang == 'en' else "Bu içerik yalnızca eğitim amaçlıdır ve hukuki tavsiye niteliği taşımaz. Yasalar yargı yetkisine göre değişir ve bireysel koşullar farklılık gösterir. Bu bilgilere güvenmeden önce lisanslı bir avukata danışın."}
"""

    # Write the file
    full_content = frontmatter + review_banner + content + citations_section + disclaimer

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(full_content)

    return filepath


def main():
    parser = argparse.ArgumentParser(
        description='Generate AI-assisted legal content for EchoLegal'
    )
    parser.add_argument(
        '--topic',
        type=str,
        help='Topic slug or title to research (e.g., "LLC formation in Delaware")'
    )
    parser.add_argument(
        '--question',
        type=str,
        help='Specific question to answer (e.g., "What are E-2 visa requirements?")'
    )
    parser.add_argument(
        '--lang',
        type=str,
        choices=['en', 'tr'],
        default='en',
        help='Output language (default: en)'
    )
    parser.add_argument(
        '--context',
        type=str,
        default='',
        help='Additional context for the AI'
    )
    parser.add_argument(
        '--output-dir',
        type=str,
        help='Custom output directory for drafts'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Print output without creating files'
    )

    args = parser.parse_args()

    if not args.topic and not args.question:
        parser.error('Either --topic or --question is required')

    # Determine the prompt
    prompt = args.topic or args.question
    is_question = bool(args.question)

    print(f"🔍 Researching: {prompt}")
    print(f"📝 Language: {args.lang}")
    print()

    # Add language context
    lang_context = ""
    if args.lang == 'tr':
        lang_context = "Please provide the response in Turkish (Türkçe). "

    full_context = lang_context + args.context

    # Call AI API
    print("🤖 Calling AI API...")
    result = call_ai_api(prompt, full_context)

    if result['confidence'] == 0.0 and '[ERROR]' in result['content']:
        print(f"❌ {result['content']}")
        sys.exit(1)

    print(f"✅ Content generated (confidence: {result['confidence']:.0%})")
    print(f"📚 Citations found: {len(result['citations'])}")

    if args.dry_run:
        print("\n--- DRY RUN OUTPUT ---\n")
        print(result['content'])
        print("\n--- END DRY RUN ---")
        return

    # Generate title and slug
    title = prompt if not is_question else f"Q&A: {prompt}"
    slug = generate_slug(prompt)

    # Create draft file
    filepath = create_draft_markdown(
        title=title,
        content=result['content'],
        lang=args.lang,
        citations=result['citations'],
        topic_slug=slug,
        confidence=result['confidence']
    )

    print(f"\n📄 Draft created: {filepath}")
    print()
    print("⚠️  IMPORTANT: This content requires attorney review before publishing.")
    print("    Edit the frontmatter to update 'reviewed_by' and 'review_date' after review.")
    print()
    print("To publish after review:")
    print(f"  1. Review and edit: {filepath}")
    print(f"  2. Move to: content/{args.lang}/{slug}.md")
    print("  3. Update frontmatter: status: 'published', publish_date: '<date>'")


if __name__ == '__main__':
    main()
