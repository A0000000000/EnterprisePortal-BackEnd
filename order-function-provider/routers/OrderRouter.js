const Router = require('koa-router')
const orderService = require('../services/OrderService')
const router = new Router

router.post('/createNewOrder', async ctx => {
    const token = ctx.request.header.token
    const params = ctx.request.body
    try {
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
            return
        }
        if (!params) {
            ctx.body = {
                code: 500,
                message: '参数不足.'
            }
            return
        }
        ctx.body = await orderService.createNewOrder(token, params)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/getOrderById/:id', async ctx => {
    const token = ctx.request.header.token
    const id = ctx.params.id
    try {
        ctx.body = await orderService.getOrderById(token, id)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/getOrders', async ctx => {
    const token = ctx.request.header.token
    try {
        ctx.body = await orderService.getOrders(token)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/sureSend/:id', async ctx => {
    const token = ctx.request.header.token
    const id = ctx.params.id
    try {
        ctx.body = await orderService.sureSend(token, id)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/sureReciver/:id', async ctx => {
    const token = ctx.request.header.token
    const id = ctx.params.id
    try {
        ctx.body = await orderService.sureReceiver(token, id)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/getAllOrders', async ctx => {
    const token = ctx.request.header.token
    try {
        ctx.body = await orderService.getAllOrder(token)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

module.exports = router