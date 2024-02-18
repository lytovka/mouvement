import { error } from '@sveltejs/kit'
import { MovementsMarkdownResultSchema } from '$lib/schemas/movement'
import type { PageLoad } from './$types'

export const load = (async ({ url, params, fetch }) => {
  console.log('inside load')
  const u = new URL(`${url.origin}/api/styles/${params.name}`)
  const movements = await fetch(u.toString(), { method: 'GET' }).then(response => response.json())
  console.log('heeey', movements)
  const result = MovementsMarkdownResultSchema.safeParse(movements)
  if (!result.success) {
    return error(400, result.error.message)
  }
  return result.data
}) satisfies PageLoad
