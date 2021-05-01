const Router = require('koa-router')
const router = new Router()
const couponService = require('../services/CouponService')

router.get('/getAllCoupon', async ctx => {
    try {
        const token = ctx.request.header.token
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
        } else {
            ctx.body = await couponService.getAllCoupon(token)
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/getCoupon/:id', async ctx => {
    try {
        const id = ctx.params.id
        ctx.body = await couponService.getCouponById(id)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.post('/addNewCoupon', async ctx => {
    try {
        const token = ctx.request.header.token
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
        } else {
            ctx.body = await couponService.addNewCoupon(token, ctx.request.body)
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.put('/updateCoupon', async ctx => {
    try {
        const token = ctx.request.header.token
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
        } else {
            const params = ctx.request.body
            ctx.body = await couponService.updateCoupon(token, params)
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            code: err
        }
    }
})

router.delete('/deleteCoupon/:id', async ctx => {
    try {
        const token = ctx.request.header.token
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
        } else {
            const id = ctx.params.id
            ctx.body = await couponService.deleteCouponById(token, id)
        }
    } catch (err) {
        return {
            code: 500,
            message: err
        }
    }
})

module.exports = router