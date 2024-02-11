import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import {z} from "zod"

const MovementResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string().nullable(),
  images: z.array(z.object({id: z.string(), altText: z.string()})),
})

const MovementsResultSchema = z.array(MovementResultSchema)

export const load = (async ({ url, fetch }) => {
  const u = new URL(`${url.origin}/api/movements`)

  const cursor = url.searchParams.get('cursor')
  cursor && u.searchParams.set("cursor", cursor)

  const movementsResponse = await fetch(u.toString(), {method: "GET"})

  const result = MovementsResultSchema.safeParse(await movementsResponse.json())
  if (!result.success) {
    console.log(result.error)
    return error(400, result.error.message)
  }

  return {movements: result.data}
}) satisfies PageServerLoad
