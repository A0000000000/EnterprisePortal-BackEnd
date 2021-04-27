const Router = require('koa-router')
const router = new Router()

const messageService = require('../services/MessageService')

router.get('/getMessageTitle', async ctx => {
    try {
        ctx.body = await messageService.getMessageTitle()
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/getMessageById/:id', async ctx => {
    try {
        ctx.body = await messageService.getMessageById(ctx.params.id)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.post('/addNewMessage', async ctx => {
    try {
        let params = ctx.request.body
        const token = ctx.request.header.token
        ctx.body = await messageService.addNewMessage(token, params)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.put('/updateMessage', async ctx => {
    try {
        let params = ctx.request.body
        const token = ctx.request.header.token
        ctx.body = await messageService.updateMessage(token, params)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.delete('/deleteMessage/:id', async ctx => {
    try {
        const token = ctx.request.header.token
        ctx.body = await messageService.deleteMessage(token, ctx.params.id)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.post('/addNewImage', async ctx => {
    try {
        const token = ctx.request.header.token
        const image = ctx.request.files.image
        ctx.body = await messageService.addImage(token, image)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/image/:id', async ctx => {
    try {
        const id = ctx.params.id
        let data = await messageService.getImageById(id)
        ctx.response.set("content-type", data.contentType)
        ctx.flag = true
        ctx.body = data.file
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/getImageList', async ctx => {
    try {
        ctx.body = await messageService.getImageList(ctx.request.header.token)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

module.exports = router