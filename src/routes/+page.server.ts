import { prisma } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
	const users = await prisma.user.findMany()
	console.log("extra log")
	console.log(users)
	return
}) satisfies PageServerLoad

