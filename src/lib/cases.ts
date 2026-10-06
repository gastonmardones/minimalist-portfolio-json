import { getCollection, type CollectionEntry } from "astro:content"
import type { Lang } from "@/i18n"

export type CaseEntry = CollectionEntry<"cases">

// En Netlify, CONTEXT vale "production" solo en el deploy de main;
// en deploy previews y en local se muestran también los borradores.
const env = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env
const showDrafts = env?.CONTEXT !== "production"

export const caseKey = (entry: CaseEntry) => entry.slug.split("/").slice(1).join("/")
export const caseLang = (entry: CaseEntry) => entry.slug.split("/")[0] as Lang

export async function getCases(lang: Lang) {
  const entries = await getCollection(
    "cases",
    (entry) => caseLang(entry) === lang && (showDrafts || !entry.data.draft)
  )
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

export const monthKey = (date: Date) =>
  `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`

export const formatMonth = (date: Date, lang: Lang) =>
  date.toLocaleDateString(lang === "en" ? "en-US" : "es-AR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
