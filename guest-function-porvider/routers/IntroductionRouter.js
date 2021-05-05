const Router = require('koa-router')
const router = new Router()

const introductionService = require('../service/IntroductionService')

router.get('/getIntroductions', async ctx => {
    try {
        ctx.body = {
            code: 200,
            data: await introductionService.getIntroductions()
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/getImage/:id', async ctx => {
    try {
        let id = ctx.params.id
        let type = ctx.query.type
        let data = await introductionService.getImage(id)
        ctx.response.set("content-type", type)
        ctx.flag = true
        ctx.body = data
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.post('/addNewPart', async ctx => {
    try {
        const image = ctx.request.files.image
        const lines = ctx.request.body.content.split('\n')
        const order = ctx.request.body.order
        ctx.body = await introductionService.addNewPart(image, lines, order);
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.delete('/deleteItem/:id', async ctx => {
    try {
        const token = ctx.request.header.token
        const id = ctx.params.id
        ctx.body = await introductionService.deleteById(token, id)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

module.exports = router