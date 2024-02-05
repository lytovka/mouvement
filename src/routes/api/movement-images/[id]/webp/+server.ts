import { prisma } from '$lib/server/db'
import { error, type RequestHandler } from '@sveltejs/kit'

export const GET = (async ({ params }) => {
  if (!params.id) {
    error(400, 'id is missing')
  }

  const image = await prisma.movementImage.findUnique({ where: { id: params.id } })

  if (!image) {
    error(404, 'image not found')
  }

  return new Response(image.blob, {
    headers: {
      'Content-Type': image.contentType,
      'Content-Length': Buffer.byteLength(image.blob).toString(),
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}) satisfies RequestHandler
