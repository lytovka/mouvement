import fs from 'fs/promises'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const img = async ({ altText, filepath }: { altText: string; filepath: string }) => {
  const fileExt = filepath.match(/[a-z]*$/)?.[0] ?? 'png'
  return {
    altText,
    contentType: `image/${fileExt}`,
    blob: await fs.readFile(filepath)
  }
}

async function seedStyles() {
  const totalStyles = 3
  console.time(`🕺 Created ${totalStyles} styles...`)

  const styles = ['Hip-Hop', 'Jazz-Funk', 'Afrodance']
  const stylesImages = await Promise.all([
    img({ altText: 'hip-hop', filepath: './tests/fixtures/images/styles/hip-hop.png' }),
    img({ altText: 'jazz-funk', filepath: './tests/fixtures/images/styles/jazz-funk.png' }),
    img({ altText: 'afrodance', filepath: './tests/fixtures/images/styles/afrodance.png' })
  ])

  const movementImages = await Promise.all([
    img({
      altText: 'Meme dance',
      filepath: './tests/fixtures/images/movements/dance1.webp'
    }),
    img({
      altText: 'Seinfeld dance 1',
      filepath: './tests/fixtures/images/movements/dance2.webp'
    }),
    img({
      altText: 'Seinfeld dance 2',
      filepath: './tests/fixtures/images/movements/dance3.webp'
    }),
    img({
      altText: 'Ivan Dance',
      filepath: './tests/fixtures/images/movements/dance4.webp'
    })
  ])

  for (let i = 0; i < totalStyles; i++) {
    await prisma.style.create({
      select: { id: true },
      data: {
        name: styles[i % totalStyles],
        slug: toUrlFriendlySubpath(styles[i % totalStyles]),
        img: { create: stylesImages[i % totalStyles] },
        movements: {
          create: Array.from({ length: faker.number.int({ min: 10, max: 15 }) }).map(() => ({
            name: faker.lorem.words({ min: 1, max: 6 }),
            content: faker.lorem.paragraphs({ min: 1, max: 3 }),
            images: {
              // TODO: use random length for movement varations
              create: Array.from({ length: 1 }).map(() => {
                const imgNumber = faker.number.int({ min: 0, max: movementImages.length - 1 })
                return movementImages[imgNumber]
              })
            }
          }))
        }
      }
    })
  }
  console.timeEnd(`🕺 Created ${totalStyles} styles...`)
  console.timeEnd(`🌱 Database has been seeded`)
}

export function toUrlFriendlySubpath(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-_]/g, '')
}

async function seed() {
  console.log('🌱 Seeding...')
  console.time(`🌱 Database has been seeded`)

  console.time('🧹 Cleaned up the database...')
  await prisma.style.deleteMany()
  await prisma.movement.deleteMany()
  console.timeEnd('🧹 Cleaned up the database...')
  await seedStyles()
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
