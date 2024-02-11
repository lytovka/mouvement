import { prisma } from "$lib/server/db"
import { json, type RequestHandler } from "@sveltejs/kit"

const PAGE_LIMIT = 20

export const GET = (async ({ params, url }) => {
  const cursor = url.searchParams.get('cursor')
  const movements = await prisma.movement.findMany({
    take: PAGE_LIMIT,
    skip: cursor ? 1 : undefined,
    cursor: cursor ? { id: cursor } : undefined,
    select: {
      id: true,
      name: true,
      content: true,
      images: { select: { id: true, altText: true }, take: 1, orderBy: { createdAt: 'asc' } }
    },
    where: { style: { slug: params.name } }
  })

  return json(movements)
}) satisfies RequestHandler

