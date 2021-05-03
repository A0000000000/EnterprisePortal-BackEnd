const Router = require('koa-router')
const router = new Router()
const locationService = require('../service/LocationService')

router.post('/addNewLocation', async ctx => {
    try {
        const token = ctx.request.header.token
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
            return
        }
        const params = ctx.request.body
        // 校验参数
        if (!params || !params.name || !params.details) {
            ctx.body = {
                code: 500,
                message: '参数不能为空.'
            }
            return
        }
        ctx.body = await locationService.addNewLocation(token, {
            name: params.name,
            details: params.details,
            createTime: Date.now()
        })
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/getAllLocation', async ctx => {
    try {
        const token = ctx.request.header.token
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
            return
        }
        ctx.body = await locationService.getAllLocation(token)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.delete('/deleteLocation/:id', async ctx => {
    try {
        const token = ctx.request.header.token
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
            return
        }
        ctx.body = await locationService.deleteById(token, ctx.params.id)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/getLocationById/:id', async ctx => {
    try {
        const token = ctx.request.header.token
        const id = ctx.params.id
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
        } else {
            ctx.body = await locationService.getLocationById(token, id)
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})


module.exports = router