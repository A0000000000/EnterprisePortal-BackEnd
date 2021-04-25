const Router = require('koa-router')
const router = new Router()

const introductionService = require('../service/IntroductionService')

router.get('/getIntroductions', async ctx => {
    ctx.body = {
        code: 200,
        data: await introductionService.getIntroductions()
    }
})

router.get('/getImage/:id', async ctx => {
    let id = ctx.params.id
    let type = ctx.query.type
    let data = await introductionService.getImage(id)
    ctx.response.set("content-type",  type)
    ctx.flag = true
    ctx.body = data
})

router.post('/addNewPart', async ctx => {
    const image = ctx.request.files.image
    const lines = ctx.request.body.content.split('\n')
    const order = ctx.request.body.order
    ctx.body = await introductionService.addNewPart(image, lines, order);
})

module.exports = router