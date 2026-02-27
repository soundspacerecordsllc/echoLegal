<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>EchoLegal — Sitemap</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #333; max-width: 1200px; margin: 0 auto; padding: 2rem; }
          h1 { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.25rem; }
          p.meta { color: #666; font-size: 0.875rem; margin-bottom: 2rem; }
          table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
          th { text-align: left; padding: 0.75rem 1rem; background: #f8f8f8; border-bottom: 2px solid #e5e5e5; font-weight: 600; color: #555; }
          td { padding: 0.5rem 1rem; border-bottom: 1px solid #eee; }
          tr:hover td { background: #fafafa; }
          a { color: #111; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .priority { text-align: center; }
          .freq { text-align: center; color: #888; }
          .date { color: #888; white-space: nowrap; }
          .alt { font-size: 0.75rem; color: #999; }
        </style>
      </head>
      <body>
        <h1>EchoLegal Sitemap</h1>
        <p class="meta">
          <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs
        </p>
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Hreflang</th>
              <th class="freq">Frequency</th>
              <th class="priority">Priority</th>
              <th>Last Modified</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                </td>
                <td class="alt">
                  <xsl:for-each select="xhtml:link">
                    <xsl:value-of select="@hreflang"/>
                    <xsl:if test="position() != last()">, </xsl:if>
                  </xsl:for-each>
                </td>
                <td class="freq"><xsl:value-of select="sitemap:changefreq"/></td>
                <td class="priority"><xsl:value-of select="sitemap:priority"/></td>
                <td class="date"><xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
