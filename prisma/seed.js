const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const taskData = [
  {
    title: 'first task'
  },
  {
    title: 'second task'
  }
]

async function main() {
  console.log(`開始`)
  for (const u of taskData) {
    const task = await prisma.task.create({
      data: u,
    })
    console.log(`タスクID${task.id}を作成`)
  }
  console.log(`完了`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
