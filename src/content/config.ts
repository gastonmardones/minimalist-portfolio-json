import { defineCollection, z } from "astro:content"

// Un caso = un archivo Markdown por idioma: src/content/cases/<es|en>/<clave>.md
// La misma <clave> en ambos idiomas vincula las traducciones.
const cases = defineCollection({
  type: "content",
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
