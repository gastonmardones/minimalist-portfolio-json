import { casePath, casesPath, getCV, rssPath, t, type Lang } from "@/i18n"
import { caseKey, getCases } from "@/lib/cases"

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

export async function buildRss(lang: Lang, site: URL | undefined) {
  const { basics } = getCV(lang)
  const base = site ?? new URL(basics.url)
  const ui = t(lang)
  // El feed nunca publica borradores, aunque se genere en un deploy preview
  const cases = (await getCases(lang)).filter((entry) => !entry.data.draft)

  const items = cases
    .map((entry) => {
      const url = new URL(casePath(lang, caseKey(entry)), base).href
      const categories = entry.data.tags
        .map((tag) => `      <category>${escape(tag)}</category>`)
        .join("\n")
      return `    <item>
      <title>${escape(entry.data.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${entry.data.date.toUTCString()}</pubDate>
      <description>${escape(entry.data.summary)}</description>
${categories}
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${ui.casesTitle} · ${basics.name}`)}</title>
    <link>${new URL(casesPath(lang), base).href}</link>
    <atom:link href="${new URL(rssPath(lang), base).href}" rel="self" type="application/rss+xml" />
    <description>${escape(ui.casesIntro)}</description>
    <language>${lang === "en" ? "en-us" : "es-ar"}</language>
${items}
  </channel>
</rss>
`
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
