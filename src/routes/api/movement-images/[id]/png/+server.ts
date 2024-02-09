import { prisma } from '$lib/server/db'
import { error, type RequestHandler } from '@sveltejs/kit'
import sharp from 'sharp'

export const GET = (async ({ params, request }) => {
  console.log(request.headers.get("user-agent"))
  if (!params.id) {
    error(400, 'id is missing')
  }

  const image = await prisma.movementImage.findUnique({ where: { id: params.id } })

  if (!image) {
    error(404, 'image not found')
  }

  const singleFrameBuffer = await sharp(image.blob).png().toBuffer()

  return new Response(singleFrameBuffer.buffer, {
    headers: {
      'Content-Type': image.contentType,
      // 'Content-Length': singleFrameBuffer.buffer.byteLength(image.blob).toString(),
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}) satisfies RequestHandler
