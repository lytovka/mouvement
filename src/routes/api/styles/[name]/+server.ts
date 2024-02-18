import { error, json } from '@sveltejs/kit'
import type { RequestHandler, RouteParams } from './$types'
import { z } from 'zod'
import { MovementMarkdownResultSchema } from '$lib/schemas/movement'

const MarkdownFileSchema = z.object({
  metadata: MovementMarkdownResultSchema
})

const loadMarkdownModules = (params: RouteParams) => {
  const isDev = import.meta.env.DEV
  let paths
  if (isDev) {
    console.log('import modules for dev')
    switch (params.name) {
      case 'hip-hop': {
        paths = import.meta.glob('/src/content/styles-dev/hip-hop/*.md')
        break
      }
      case 'house': {
        paths = import.meta.glob('/src/content/styles-dev/house/*.md')
        break
      }
      case 'afrodance': {
        paths = import.meta.glob('/src/content/styles-dev/afrodance/*.md')
        break
      }
      default: {
        return error(400, `Unsupported path param: '${params.name}'`)
      }
    }
    return paths
  }

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
  return paths
}

export const GET = (async ({ params }) => {
  const paths = loadMarkdownModules(params)
  const metadatas = []
  for (const path in paths) {
    console.log((await paths[path]()).metadata)
    const fileResponse = MarkdownFileSchema.safeParse(await paths[path]())
    if (!fileResponse.success) {
      return error(400, fileResponse.error.message)
    }
    metadatas.push(fileResponse.data.metadata)
  }
  return json({ movements: metadatas })
}) satisfies RequestHandler
