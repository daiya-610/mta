const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const { PrismaClient } = require('@prisma/client')
const cors = require('@koa/cors')

const app = new Koa()
const router = new Router()
const prisma = new PrismaClient()

app
  .use(cors({
    origin:"http://localhost:3000",
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  }))
  .use(router.routes())

router.get('/', async (ctx,next) => {
    ctx.body = "Hello"
})

// GET:タスク一覧
router.get('/tasks', async (ctx,next) => {
    // エラー処理
    // try : エラーが起きそうな処理を書く
    try {
        const tasks = await prisma.task.findMany()
        ctx.body = tasks
    } catch (error) {
        ctx.body = {
            "error": error
        }
    }
  })
  
  // GET:個別タスク
  router.get('/tasks/:id', async (ctx,next) => {
      try {
        const task = await prisma.task.findUnique({
            where: { id: Number(ctx.params.id) }
        })
        ctx.body = task
      } catch (error) {
        ctx.body = {
            "error": error
        }
      }
  })
  
  // POST:タスク新規作成
router.post('/tasks',koaBody(), async (ctx,next) => {
    try {
      const task = await prisma.task.create({
        data: { title: ctx.request.body['title'] }
      })
      ctx.status = 200
      ctx.body = task
    } catch (error) {
      ctx.status = 500;
    }
  })
  
  // PUT:タスク更新
  router.put('/tasks/:id',koaBody(), async (ctx,next) => {
    try {
      await prisma.task.update({
        where: { id: Number(ctx.params.id) },
        data: { title: ctx.request.body['title'] },
      })
      ctx.status = 200
    } catch (error) {
      ctx.status = 500
    }
  })
  
  // DELETE:タスク削除
  router.delete('/tasks/:id', async (ctx,next) => {
    try {
      const task = await prisma.task.delete({
        where: { id: Number(ctx.params.id) }
      })
      ctx.status = 200
      ctx.body = task
    } catch (error) {
      ctx.status = 500
    }
  })  

app.listen(8000)