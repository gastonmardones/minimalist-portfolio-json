import type { APIRoute } from "astro"

import { CASES } from "@/data/cases"
import { LANGS, casePath, homePath } from "@/i18n"

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL("https://gastonmardones.netlify.app")
  const paths = LANGS.flatMap((lang) => [
    homePath(lang),
    ...CASES.map(({ slug }) => casePath(lang, slug)),
  ])

  const urls = paths
    .map((path) => `  <url><loc>${new URL(path, base).href}</loc></url>`)
    .join("\n")

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } }
  )
}
