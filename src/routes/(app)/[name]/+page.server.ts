import type { PageServerLoad } from './$types'

export const load = (async ({ url, fetch }) => {
  const u = new URL(`${url.origin}/api/movements`)

  const cursor = url.searchParams.get('cursor')
  cursor && u.searchParams.set("cursor", cursor)

  const response = await fetch(u.toString(), {method: "GET"})
  return { movements: await response.json() }
}) satisfies PageServerLoad
