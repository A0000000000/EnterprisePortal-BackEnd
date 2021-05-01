const Router = require('koa-router')
const router = new Router()

const couponInfoService = require('../services/CouponInfoService')

router.get('/allCouponNotUse', async ctx => {
    try {
        const token = ctx.request.header.token
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
        } else {
            ctx.body = await couponInfoService.getAllInfos(token)
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/registerSendCoupon', async ctx => {
    try {
        const token = ctx.request.header.token
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
        } else {
            ctx.body = await couponInfoService.registerSendCoupon(token)
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/useCoupon/:id', async ctx => {
    try {
        const id = ctx.params.id
        const token = ctx.request.header.token
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
        } else {
            ctx.body = await couponInfoService.updateCoupon(token, id)
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/getCouponByInfoId/:id', async ctx => {
    try {
        const id = ctx.params.id
        const token = ctx.request.header.token
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
        } else {
            ctx.body = await couponInfoService.getCoupon(token, id)
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

module.exports = router