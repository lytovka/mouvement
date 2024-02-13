import { prisma } from '$lib/server/db'
import { json, type RequestHandler } from '@sveltejs/kit'

const PAGE_LIMIT = 10

export const GET = (async ({ params, url }) => {
  const cursor = url.searchParams.get('cursor')
  const q = url.searchParams.get('q')

  const movements = await prisma.movement.findMany({
    take: PAGE_LIMIT,
    cursor: cursor ? { id: cursor } : undefined,
    select: {
      id: true,
      name: true,
      content: true,
      images: { select: { id: true, altText: true }, take: 1, orderBy: { createdAt: 'asc' } }
    },
    where: { style: { slug: params.name }, name: q ? { startsWith: q } : undefined }
  })
  return json(movements)
}) satisfies RequestHandler
