#!/usr/bin/env python3
"""
EchoLegal Sitemap Generator
Crawls the site and generates an XML sitemap for Google Search Console.

Usage:
    python generate-sitemap.py [--base-url https://echo-legal.com] [--output sitemap.xml]
"""

import argparse
import re
import xml.etree.ElementTree as ET
from collections import deque
from datetime import datetime
from typing import Set, Optional
from urllib.parse import urljoin, urlparse

try:
    import requests
    from bs4 import BeautifulSoup
    HAS_DEPENDENCIES = True
except ImportError:
    HAS_DEPENDENCIES = False


def normalize_url(url: str, base_domain: str) -> Optional[str]:
    """Normalize URL and return None if it should be excluded."""
    parsed = urlparse(url)

    # Skip external domains
    if parsed.netloc and parsed.netloc != base_domain:
        return None

    # Skip non-http schemes, anchors, and query strings for cleaner sitemap
    if parsed.scheme and parsed.scheme not in ('http', 'https', ''):
        return None

    # Skip file extensions that aren't pages
    excluded_extensions = (
        '.pdf', '.zip', '.png', '.jpg', '.jpeg', '.gif', '.svg',
        '.css', '.js', '.ico', '.xml', '.json', '.woff', '.woff2', '.ttf'
    )
    if any(parsed.path.lower().endswith(ext) for ext in excluded_extensions):
        return None

    # Skip common non-page paths
    excluded_paths = (
        '/api/', '/_next/', '/static/', '/documents/',
        '/images/', '/fonts/', '/favicon'
    )
    if any(parsed.path.startswith(path) for path in excluded_paths):
        return None

    # Normalize: remove trailing slash (except for root), remove fragment
    path = parsed.path.rstrip('/') if parsed.path != '/' else '/'

    return f"https://{base_domain}{path}"


def crawl_site(base_url: str, max_pages: int = 500) -> Set[str]:
    """
    Crawl the website starting from base_url and collect all internal page URLs.

    Args:
        base_url: Starting URL for crawling
        max_pages: Maximum number of pages to crawl (safety limit)

    Returns:
        Set of discovered page URLs
    """
    if not HAS_DEPENDENCIES:
        print("Error: requests and beautifulsoup4 are required.")
        print("Install with: pip install requests beautifulsoup4")
        return set()

    parsed_base = urlparse(base_url)
    base_domain = parsed_base.netloc

    visited: Set[str] = set()
    to_visit: deque = deque([base_url])
    discovered_urls: Set[str] = set()

    # Add root URL
    normalized_base = normalize_url(base_url, base_domain)
    if normalized_base:
        discovered_urls.add(normalized_base)

    print(f"Starting crawl from: {base_url}")
    print(f"Domain: {base_domain}")
    print("-" * 50)

    while to_visit and len(visited) < max_pages:
        current_url = to_visit.popleft()

        # Skip if already visited
        if current_url in visited:
            continue

        visited.add(current_url)

        try:
            response = requests.get(
                current_url,
                timeout=10,
                headers={
                    'User-Agent': 'EchoLegal-Sitemap-Generator/1.0 (+https://echo-legal.com)',
                    'Accept': 'text/html,application/xhtml+xml'
                }
            )

            # Skip non-HTML responses
            content_type = response.headers.get('content-type', '')
            if 'text/html' not in content_type:
                continue

            if response.status_code != 200:
                print(f"  Skip (HTTP {response.status_code}): {current_url}")
                continue

            print(f"  Crawled: {current_url}")

            # Parse HTML and extract links
            soup = BeautifulSoup(response.text, 'html.parser')

            for link in soup.find_all('a', href=True):
                href = link['href']

                # Convert relative URLs to absolute
                absolute_url = urljoin(current_url, href)

                # Normalize and validate
                normalized = normalize_url(absolute_url, base_domain)

                if normalized and normalized not in visited:
                    discovered_urls.add(normalized)
                    if normalized not in visited:
                        to_visit.append(normalized)

        except requests.RequestException as e:
            print(f"  Error crawling {current_url}: {e}")
            continue

    print("-" * 50)
    print(f"Crawl complete. Found {len(discovered_urls)} URLs.")

    return discovered_urls


def generate_static_urls(base_url: str) -> Set[str]:
    """
    Generate known static URLs based on the EchoLegal site structure.
    This is useful when crawling isn't possible or as a fallback.
    """
    parsed = urlparse(base_url)
    base_domain = parsed.netloc or 'echo-legal.com'

    # Known page patterns based on the codebase structure
    urls = set()

    # Languages
    languages = ['en', 'tr']

    # Main pages
    main_pages = [
        '',  # Homepage
        '/contracts',
        '/library',
        '/legal-kits',
        '/consular-documents',
        '/support',
        '/amerika',
        '/encyclopedia',
    ]

    # Contract pages
    contract_pages = [
        '/contracts/nda',
        '/contracts/service-agreement',
        '/contracts/freelance-agreement',
        '/contracts/influencer-agreement',
        '/contracts/independent-contractor',
        '/contracts/privacy-policy',
        '/contracts/terms-of-service',
    ]

    # Library pages
    library_pages = [
        '/library/llc-kurma-rehberi',
        '/library/llc-vize-yanilgisi',
        '/library/irs-vergi-gercekleri',
        '/library/hukuki-yanilgilar',
        '/library/temel-sozlesmeler',
    ]

    # Legal kit pages
    kit_pages = [
        '/legal-kits/business-starter',
        '/legal-kits/freelancer-essentials',
        '/legal-kits/ecommerce-bundle',
    ]

    # Consular document pages
    consular_pages = [
        '/consular-documents/passport',
        '/consular-documents/turkish-id',
        '/consular-documents/notary-services',
        '/consular-documents/birth-registration',
        '/consular-documents/marriage-registration',
        '/consular-documents/death-registration',
        '/consular-documents/population-registry',
        '/consular-documents/document-certification',
    ]

    # Checklist pages
    checklist_pages = [
        '/checklists/llc-kontrol-listesi',
        '/checklists/w8-w9-karar-haritasi',
        '/checklists/irs-mektup-rehberi',
    ]

    # Amerika hub pages
    amerika_pages = [
        '/amerika/abdye-gelme-yollari',
        '/amerika/turist-vizesi-gercekleri',
        '/amerika/statuden-statuye-gecis-gercekleri',
        '/amerika/abdde-llc-kurmak',
        '/amerika/llc-mi-corp-mu',
        '/amerika/abdde-banka-hesabi',
        '/amerika/irs-vergi-gercekleri',
        '/amerika/abdde-is-yapanlar-icin-sozlesmeler',
        '/amerika/ny-law-neden-tercih-edilir',
        '/amerika/platform-ne-yapar-ne-yapmaz',
    ]

    # Legal pages
    legal_pages = [
        '/legal/disclaimer',
        '/legal/privacy',
        '/legal/cookies',
        '/legal/terms',
    ]

    # Encyclopedia pages
    encyclopedia_pages = [
        '/encyclopedia/what-is-nda',
    ]

    # Combine all page patterns
    all_pages = (
        main_pages + contract_pages + library_pages + kit_pages +
        consular_pages + checklist_pages + amerika_pages +
        legal_pages + encyclopedia_pages
    )

    # Generate URLs for both languages
    for lang in languages:
        for page in all_pages:
            url = f"https://{base_domain}/{lang}{page}"
            urls.add(url)

    return urls


def create_sitemap_xml(urls: Set[str], output_file: str) -> None:
    """
    Generate an XML sitemap from a set of URLs.

    Args:
        urls: Set of page URLs to include
        output_file: Path to save the sitemap XML
    """
    # XML namespace for sitemap
    namespace = "http://www.sitemaps.org/schemas/sitemap/0.9"

    # Create root element
    urlset = ET.Element('urlset', xmlns=namespace)

    # Sort URLs for consistent output
    sorted_urls = sorted(urls)

    # Current date for lastmod
    today = datetime.now().strftime('%Y-%m-%d')

    # Priority mapping based on URL structure
    def get_priority(url: str) -> str:
        path = urlparse(url).path
        if path in ['/', '/en', '/tr', '/en/', '/tr/']:
            return '1.0'
        elif '/contracts' in path and path.count('/') == 2:
            return '0.9'
        elif '/legal-kits' in path and path.count('/') == 2:
            return '0.9'
        elif '/library' in path and path.count('/') == 2:
            return '0.8'
        elif '/contracts/' in path:
            return '0.8'
        elif '/legal-kits/' in path:
            return '0.8'
        elif '/library/' in path:
            return '0.7'
        elif '/consular-documents' in path:
            return '0.7'
        elif '/amerika' in path:
            return '0.7'
        elif '/checklists' in path:
            return '0.6'
        elif '/encyclopedia' in path:
            return '0.6'
        elif '/legal/' in path:
            return '0.5'
        else:
            return '0.5'

    # Change frequency mapping
    def get_changefreq(url: str) -> str:
        path = urlparse(url).path
        if path in ['/', '/en', '/tr', '/en/', '/tr/']:
            return 'weekly'
        elif '/contracts' in path:
            return 'monthly'
        elif '/legal-kits' in path:
            return 'monthly'
        elif '/library' in path:
            return 'monthly'
        else:
            return 'monthly'

    for url in sorted_urls:
        url_element = ET.SubElement(urlset, 'url')

        loc = ET.SubElement(url_element, 'loc')
        loc.text = url

        lastmod = ET.SubElement(url_element, 'lastmod')
        lastmod.text = today

        changefreq = ET.SubElement(url_element, 'changefreq')
        changefreq.text = get_changefreq(url)

        priority = ET.SubElement(url_element, 'priority')
        priority.text = get_priority(url)

    # Create XML tree and write to file
    tree = ET.ElementTree(urlset)

    # Write with XML declaration
    with open(output_file, 'wb') as f:
        f.write(b'<?xml version="1.0" encoding="UTF-8"?>\n')
        tree.write(f, encoding='unicode' if hasattr(f, 'mode') else 'utf-8')

    # Pretty print (optional, rewrite with proper formatting)
    try:
        import xml.dom.minidom
        with open(output_file, 'r') as f:
            content = f.read()
        dom = xml.dom.minidom.parseString(content)
        pretty_xml = dom.toprettyxml(indent='  ')
        # Remove extra blank lines and fix declaration
        lines = [line for line in pretty_xml.split('\n') if line.strip()]
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
    except Exception:
        pass  # Keep original format if pretty print fails

    print(f"\nSitemap saved to: {output_file}")
    print(f"Total URLs included: {len(sorted_urls)}")


def print_deployment_instructions():
    """Print instructions for deploying the sitemap and submitting to Search Console."""
    instructions = """
================================================================================
                    SITEMAP DEPLOYMENT INSTRUCTIONS
================================================================================

1. DEPLOY THE SITEMAP
   ------------------
   Place the generated sitemap.xml file at your site's root:

   For Next.js (EchoLegal):
   - Copy sitemap.xml to the /public folder
   - It will be accessible at: https://echo-legal.com/sitemap.xml

   Alternatively, create a dynamic sitemap:
   - Create /app/sitemap.ts for automatic generation

2. ADD SITEMAP REFERENCE TO ROBOTS.TXT
   ------------------------------------
   Add this line to your robots.txt (in /public/robots.txt):

   Sitemap: https://echo-legal.com/sitemap.xml

3. SUBMIT TO GOOGLE SEARCH CONSOLE
   --------------------------------
   a) Go to: https://search.google.com/search-console
   b) Select your property (echo-legal.com)
   c) Navigate to: Indexing > Sitemaps
   d) Enter: sitemap.xml (or the full URL)
   e) Click "Submit"

   Google will process the sitemap and begin crawling the listed URLs.

4. MANUAL INDEXING (WHEN NEEDED)
   ------------------------------
   The sitemap signals Google to crawl all listed pages automatically.
   Manual URL Inspection is only needed for:

   - Newly published high-priority pages you want indexed immediately
   - Pages that have been updated significantly
   - URLs that aren't appearing in search results after several days

   To manually request indexing:
   a) Go to Search Console
   b) Enter the URL in the top search bar
   c) Click "Request Indexing"

   Note: There's a daily limit on manual indexing requests.

5. MONITOR INDEXING STATUS
   ------------------------
   In Search Console, check:
   - Coverage report: See which URLs are indexed
   - Sitemap report: Verify sitemap was processed successfully
   - URL Inspection: Check individual page status

6. BEST PRACTICES
   ---------------
   - Update the sitemap when adding/removing pages
   - Keep sitemap under 50,000 URLs (or 50MB)
   - Use lastmod dates to signal content updates
   - Ensure all sitemap URLs return 200 status codes
   - Don't include redirecting URLs (301/302)
   - Don't include URLs blocked by robots.txt

================================================================================
"""
    print(instructions)


def main():
    parser = argparse.ArgumentParser(
        description='Generate XML sitemap for EchoLegal website'
    )
    parser.add_argument(
        '--base-url',
        default='https://echo-legal.com',
        help='Base URL of the website (default: https://echo-legal.com)'
    )
    parser.add_argument(
        '--output',
        default='sitemap.xml',
        help='Output file path (default: sitemap.xml)'
    )
    parser.add_argument(
        '--crawl',
        action='store_true',
        help='Crawl the live site (requires requests & beautifulsoup4)'
    )
    parser.add_argument(
        '--static-only',
        action='store_true',
        help='Generate sitemap from known static URLs without crawling'
    )
    parser.add_argument(
        '--max-pages',
        type=int,
        default=500,
        help='Maximum pages to crawl (default: 500)'
    )

    args = parser.parse_args()

    print("=" * 60)
    print("        EchoLegal Sitemap Generator")
    print("=" * 60)
    print()

    if args.crawl and HAS_DEPENDENCIES:
        # Crawl the live site
        urls = crawl_site(args.base_url, args.max_pages)
    else:
        if args.crawl and not HAS_DEPENDENCIES:
            print("Warning: Crawling requires 'requests' and 'beautifulsoup4'")
            print("Install with: pip install requests beautifulsoup4")
            print("Falling back to static URL generation...\n")

        # Generate from known static URLs
        print("Generating sitemap from known static URLs...")
        urls = generate_static_urls(args.base_url)
        print(f"Generated {len(urls)} URLs from site structure.\n")

    if urls:
        create_sitemap_xml(urls, args.output)
        print_deployment_instructions()
    else:
        print("No URLs found. Sitemap not generated.")
        return 1

    return 0


if __name__ == '__main__':
    exit(main())
