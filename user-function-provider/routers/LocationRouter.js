const Router = require('koa-router')
const router = new Router()
const locationService = require('../service/LocationService')
const userService = require('../service/UserService')

router.post('/addNewLocation', async ctx => {
    // 加载用户信息
    const token = ctx.request.header.token
    const data = await userService.paserToken(token)
    if (data.err) {
        ctx.body = data
    }
    const params = ctx.request.body
    // 校验参数
    if (!params || !params.name || !params.details) {
        ctx.body = {
            code: 500,
            message: '参数不能为空.'
        }
    }
    ctx.body = await locationService.addNewLocation({
        userId: data.data.id,
        name: params.id,
        details: params.details,
        createTime: Date.now()
    })
})

router.get('/getAllLocation', async ctx => {
    const token = ctx.request.header.token
    const data = await userService.paserToken(token)
    if (data.err) {
        ctx.body = data
    }
    ctx.body = await locationService.getAllLocation(data.data.id)
})

module.exports = router