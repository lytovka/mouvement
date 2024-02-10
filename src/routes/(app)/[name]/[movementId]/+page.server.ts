import { prisma } from '$lib/server/db'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
  const movement = await prisma.movement.findUnique({
    select: { name: true, content: true, images: { select: { id: true, altText: true } } },
    where: { id: params.movementId }
  })
  return { movement }
}) satisfies PageServerLoad
