// components/JsonLdScript.tsx
// Renders JSON-LD structured data as a <script> tag.
// Server component — no client-side JS.

type JsonLdScriptProps = {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export default function JsonLdScript({ data }: JsonLdScriptProps) {
  const items = Array.isArray(data) ? data : [data]

  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
