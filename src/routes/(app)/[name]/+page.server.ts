import { prisma } from '$lib/server/db'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
  const movements = await prisma.movement.findMany({
    select: {
      id: true,
      name: true,
      content: true,
      images: { select: { id: true, altText: true }, take: 1, orderBy: { createdAt: 'asc' } }
    },
    where: { style: { slug: params.name } }
  })
  return { movements }
}) satisfies PageServerLoad
