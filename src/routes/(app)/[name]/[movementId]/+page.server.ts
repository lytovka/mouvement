import { MovementMarkdownResultSchema } from '$lib/schemas/movement'
import { error } from 'console'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
  const path = import.meta.env.DEV ? `styles-dev` : `styles`
  const content = await import(`../../../../content/${path}/${params.name}/${params.movementId}.md`)
  const response = MovementMarkdownResultSchema.safeParse(content.metadata)
  if (!response.success) {
    return error(400, 'Invalid data parsed')
  }
  return { movement: response.data }
}) satisfies PageServerLoad
