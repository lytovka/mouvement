import { error } from '@sveltejs/kit'
import { MovementsResultSchema } from '$lib/schemas/movement'
import type { PageLoad } from './$types'

export const load = (async ({ url, fetch }) => {
  const u = new URL(`${url.origin}/api/movements`)

  const cursor = url.searchParams.get('cursor')
  const q = url.searchParams.get('q')

  q && u.searchParams.set('q', encodeURIComponent(q))
  cursor && u.searchParams.set('cursor', encodeURIComponent(cursor))

  const movementsResponse = await fetch(u.toString(), { method: 'GET' })

  const result = MovementsResultSchema.safeParse(await movementsResponse.json())
  if (!result.success) {
    return error(400, result.error.message)
  }

  return { movements: result.data }
}) satisfies PageLoad
