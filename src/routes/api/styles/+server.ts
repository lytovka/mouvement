import { z } from 'zod'
import type { RequestHandler } from './$types'
import { json, error } from '@sveltejs/kit'

const StyleMarkdownSchema = z.object({ name: z.string(), path: z.string() })

const StylesSchema = z.object({ styles: z.array(StyleMarkdownSchema) })

const StyleFileMarkdownSchema = z.object({
  metadata: StylesSchema
})

export type StylesType = z.infer<typeof StylesSchema>

export const GET = (async () => {
  const paths = import.meta.glob('/src/content/styles/styles.md')
  for (const path in paths) {
    const file = await paths[path]()
    const stylesResponse = StyleFileMarkdownSchema.safeParse(file)
    if (!stylesResponse.success) {
      return error(400, 'Error parsing styles')
    }
    return json(stylesResponse.data.metadata)
  }
  return error(500, 'Could not parse styles')
}) satisfies RequestHandler
