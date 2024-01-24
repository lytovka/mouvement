import fs from "fs/promises"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const img = async ({altText, filepath}: {altText: string, filepath: string}) => {
	const fileExt = filepath.match(/[a-z]*$/)?.[0] ?? "png"
	return {
		altText,
		contentType: `image/${fileExt}`,
		blob: await fs.readFile(filepath)
	}
}

async function seed(){
	console.log('🌱 Seeding...')
	console.time(`🌱 Database has been seeded`)

	console.time('🧹 Cleaned up the database...')	
	await prisma.style.deleteMany()
	console.timeEnd('🧹 Cleaned up the database...')

	const totalStyles = 3
	console.time(`🕺 Created ${totalStyles} styles...`)

	const styles = ["Hip-Hop", "Jazz-Funk", "Afrodance"]
	const stylesImages = await Promise.all([
	img({altText: 'hip-hop', filepath: './tests/fixtures/images/styles/hip-hop.png'}),
	img({altText: 'jazz-funk', filepath: './tests/fixtures/images/styles/jazz-funk.png'}),
	img({altText: 'afrodance', filepath: './tests/fixtures/images/styles/afrodance.png'}),
	])

	for(let i = 0; i < totalStyles; i++){
		await prisma.style.create({
			select: {id: true},
			data: {
			name: styles[i % totalStyles], 
				img: {create: stylesImages[i % totalStyles]}
			}
		})
	}
	console.timeEnd(`🕺 Created ${totalStyles} styles...`)
	console.timeEnd(`🌱 Database has been seeded`)
}

seed()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	}).finally(async() => {
		await prisma.$disconnect()	
})
