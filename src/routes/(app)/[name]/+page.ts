import { error } from '@sveltejs/kit'
import { MovementsMarkdownResultSchema } from '$lib/schemas/movement'
import type { PageLoad } from './$types'

export const load = (async ({ url, params, fetch }) => {
  const q = url.searchParams.get('q')
  const u = new URL(`${url.origin}/api/styles/${params.name}`)
  q && u.searchParams.set('q', q)
  const movements = await fetch(u.toString(), { method: 'GET' }).then(response => response.json())
  const result = MovementsMarkdownResultSchema.safeParse(movements)
  if (!result.success) {
    return error(400, result.error.message)
  }
  return result.data
}) satisfies PageLoad
