import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { z } from 'zod'
import { MovementMarkdownResultSchema } from '$lib/schemas/movement'

const MarkdownFileSchema = z.object({
  metadata: MovementMarkdownResultSchema
})

export const GET = (async ({ params }) => {
  let paths
  switch (params.name) {
    case 'hip-hop': {
      paths = import.meta.glob('/src/content/styles/hip-hop/*.md')
      break
    }
    case 'house': {
      paths = import.meta.glob('/src/content/styles/house/*.md')
      break
    }
    case 'afrodance': {
      paths = import.meta.glob('/src/content/styles/afrodance/*.md')
      break
    }
    default: {
      return error(400, `Unsupported path param: '${params.name}'`)
    }
  }

  const metadatas = []
  for (const path in paths) {
    const fileResponse = MarkdownFileSchema.safeParse(await paths[path]())
    if (!fileResponse.success) continue
    metadatas.push(fileResponse.data.metadata)
  }
  return json({ movements: metadatas })
}) satisfies RequestHandler
