import fs from "fs/promises"
import { faker } from '@faker-js/faker'
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

async function seedStyles(){
	const totalStyles = 3
	console.time(`🕺 Created ${totalStyles} styles...`)

	const styles = ["Hip-Hop", "Jazz-Funk", "Afrodance"]
	const stylesImages = await Promise.all([
	img({altText: 'hip-hop', filepath: './tests/fixtures/images/styles/hip-hop.png'}),
	img({altText: 'jazz-funk', filepath: './tests/fixtures/images/styles/jazz-funk.png'}),
	img({altText: 'afrodance', filepath: './tests/fixtures/images/styles/afrodance.png'}),
	])

	const movementImages = await Promise.all([
	img({
			altText: "Dance 1",
			filepath: "./tests/fixtures/images/movements/dance1.webp"})
	])

	const stylesIds: Array<number> = []
	for(let i = 0; i < totalStyles; i++){
		const {id} = await prisma.style.create({
			select: {id: true},
			data: {
			name: styles[i % totalStyles], 
				img: {create: stylesImages[i % totalStyles]},
				movements: {
				create: Array.from({length: faker.number.int({min: 2, max: 5})}).map(() => ({
						name: faker.lorem.words({min: 1, max: 6}),
					content: faker.lorem.paragraphs({min: 1, max: 3}),
						images: {
							// TODO: use random length for movement varations
							create: Array.from({length: 1}).map(() => {
								return movementImages[0]
							})
						},
					}))
				}
			}
		})

		stylesIds.push(id)
	}
	console.timeEnd(`🕺 Created ${totalStyles} styles...`)
	console.timeEnd(`🌱 Database has been seeded`)
}

async function seedMovements(styleIds: Array<number>) {
}

async function seed(){
	console.log('🌱 Seeding...')
	console.time(`🌱 Database has been seeded`)

	console.time('🧹 Cleaned up the database...')	
	await prisma.style.deleteMany()
	console.timeEnd('🧹 Cleaned up the database...')
	await seedStyles()
}

seed()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	}).finally(async() => {
		await prisma.$disconnect()	
})
