import { prisma } from "$lib/server/db"
import { error, type RequestHandler } from "@sveltejs/kit"

export const GET = (async ({params}) => {
	if(!params.id){
		error(400, "id is missing")
	}

	const id = parseInt(params.id)
	if(isNaN(id)){
		error(400, "Invalid number")
	}
	const image = await prisma.styleImage.findUnique({where: {id}})

	if(!image){
		error(404, "image not found")
	}
		
	return new Response(image.blob, {
		headers: {
			"Content-Type": image.contentType,
			"Content-Length": Buffer.byteLength(image.blob).toString(),
			"Cache-Control": "public, max-age=31536000, immutable"
		}
	}) 
}) satisfies RequestHandler
