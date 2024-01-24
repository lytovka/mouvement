import { prisma } from "$lib/server/db";

export const load = async () => {
	const danceStylesPromise = prisma.style.findMany({select: {id: true, name: true, img: {select: {id: true}}}})
	return { danceStyles: await danceStylesPromise } 
} 

