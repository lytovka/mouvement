import type { StylesType } from '../api/styles/+server'
import type { PageServerLoad } from './$types'

export const load = (async ({ fetch }) => {
  return fetch(`/api/styles`, { method: 'GET' }).then(response =>
    response.json()
  ) as Promise<StylesType>
}) satisfies PageServerLoad
