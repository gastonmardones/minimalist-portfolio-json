import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

// Un caso = un archivo Markdown por idioma: src/content/cases/<es|en>/<clave>.md
// La misma <clave> en ambos idiomas vincula las traducciones.
const cases = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/cases" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // Los borradores solo se ven en dev y en los deploy previews de Netlify
    draft: z.boolean().default(false),
  }),
})

export const collections = { cases }
