import type { APIRoute } from "astro"

import { LANGS, casePath, casesPath, cvPath, homePath } from "@/i18n"
import { caseKey, getCases } from "@/lib/cases"

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL("https://gastonmardones.netlify.app")
  const paths: string[] = []

  for (const lang of LANGS) {
    const cases = (await getCases(lang)).filter((entry) => !entry.data.draft)
    paths.push(
      homePath(lang),
      cvPath(lang),
      casesPath(lang),
      ...cases.map((entry) => casePath(lang, caseKey(entry)))
    )
  }

  const urls = paths
    .map((path) => `  <url><loc>${new URL(path, base).href}</loc></url>`)
    .join("\n")

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } }
  )
}
