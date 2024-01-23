import { PrismaClient } from '@prisma/client'

console.log("executing db.ts")
console.log(global)
export const prisma = new PrismaClient()

async function main() {
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

