const Router = require('koa-router')
const router = new Router()
const goodService = require('../services/GoodService')

router.get('/getAllGoods/:type', async ctx => {
    const type = ctx.params.type
    if (!type) {
        ctx.body = {
            code: 500,
            message: '类型不能为空.'
        }
    }
    try {
        ctx.body = {
            code: 200,
            data: await goodService.getAllGoods(type)
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/getGoodById/:id', async ctx => {
    const id = ctx.params.id
    if (!id) {
        ctx.body = {
            code: 500,
            message: 'id不能为空.'
        }
    }
    try {
        ctx.body = {
            code: 200,
            data: await goodService.getGoodById(id)
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/getImage/:id', async ctx => {
    let id = ctx.params.id
    let data = await goodService.getImageById(id)
    ctx.response.set("content-type", data.type)
    ctx.flag = true
    ctx.body = data.data
})

router.post('/addNewGood', async ctx => {
    let params = ctx.request.body
    let image = ctx.request.files.image
    if (!image || !params || !params.name || !params.price || !params.count || !params.details || !params.type) {
        ctx.body = {
            code: 500,
            message: '参数不足.'
        }
    }
    try {
        ctx.body = await goodService.addNewGood(ctx.request.header.token, params, image)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.put('/updateGood', async ctx => {
    let params = ctx.request.body
    const token = ctx.request.header.token
    try {
        ctx.body = await goodService.updateGood(token, params)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.post('/uploadImage', async ctx => {
    const token = ctx.request.header.token
    let image = ctx.request.files.image
    try {
        ctx.body = await goodService.uploadImage(token, image)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/getAllImage', async ctx => {
    const token = ctx.request.header.token
    try {
        ctx.body = await goodService.getImageList(token)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.post('/getPrices', async ctx => {
    const arr = ctx.request.body.goods
    if (!arr || arr.length === 0) {
        ctx.body = {
            code: 200,
            data: 0
        }
    }
    try {
        ctx.body = await goodService.caclPrices(arr)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

module.exports = router