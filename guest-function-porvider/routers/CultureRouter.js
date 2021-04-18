const Router = require('koa-router')
const router = new Router()

const cultureService = require('../service/CultureService')

router.get('/getCultures', async ctx => {
    ctx.body = await cultureService.getCultures()
})

router.get('/getImage/:id', async ctx => {
    let id = ctx.params.id
    let type = ctx.query.type
    let data = await cultureService.getImage(id)
    ctx.response.set("content-type", type)
    ctx.flag = true
    ctx.body = data
})

router.post('/addNewPart', async ctx => {
    const image = ctx.request.files.image
    const title = ctx.request.body.title
    const lines = ctx.request.body.content.split('\n')
    const order = ctx.request.body.order
    ctx.body = await cultureService.addNewPart(image, title, lines, order);
})

module.exports = router