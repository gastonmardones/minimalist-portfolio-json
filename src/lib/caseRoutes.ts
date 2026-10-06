import { otherLang, type Lang } from "@/i18n"
import { caseKey, getCases } from "@/lib/cases"

// Rutas estáticas de los casos de un idioma, indicando si existe la traducción
export async function caseStaticPaths(lang: Lang) {
  const cases = await getCases(lang)
  const translated = new Set((await getCases(otherLang(lang))).map(caseKey))

  return cases.map((entry) => ({
    params: { key: caseKey(entry) },
    props: { entry, hasTranslation: translated.has(caseKey(entry)) },
  }))
}
