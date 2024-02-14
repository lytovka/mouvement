import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'stdout' },
    { level: 'warn', emit: 'stdout' }
  ]
})

prisma.$on('query', async e => {
  // console.info(`prisma:query - ${e.duration} - ${e.query}`)
})

async function main() {}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
