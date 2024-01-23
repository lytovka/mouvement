import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function seed(){
	console.log('🌱 Seeding...')
	console.time(`🌱 Database has been seeded`)

	console.time('🧹 Cleaned up the database...')
	
	await prisma.post.deleteMany()
	await prisma.user.deleteMany()
	console.timeEnd('🧹 Cleaned up the database...')
	
	const totalUsers = 3
	console.time(`👤 Created ${totalUsers} users...`)
	for(let i = 0; i < totalUsers; i++){
		await prisma.user.create({
			select: {id: true},
			data: {
				email: `ivan-${i}@lytovka.com`,
				name: "Ivan"
			}
		})
	}
	console.timeEnd(`👤 Created ${totalUsers} users...`)
	console.timeEnd(`🌱 Database has been seeded`)
}

seed()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	}).finally(async() => {
		await prisma.$disconnect()	
})
