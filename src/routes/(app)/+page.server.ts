import { prisma } from '$lib/server/db'
import type { PageServerLoad } from './$types'

export const load = (async () => {
  const danceStyles = await prisma.style.findMany({
    select: { id: true, name: true, slug: true, img: { select: { id: true, altText: true } } }
  })
  return { danceStyles }
}) satisfies PageServerLoad
