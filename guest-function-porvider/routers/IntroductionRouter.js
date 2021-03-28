const Router = require('koa-router')
const router = new Router()

const file = require('../minio/IntroductionFiles')

router.get('/getImage', async ctx => {
    let data = await file.getImage('test')
    ctx.response.set("content-type", 'image/jpeg')
    ctx.flag = true
    ctx.body = data
})

router.get('/test', async ctx => {
    ctx.body = {
        id: 1,
        message: 'test'
    }
})

module.exports = router