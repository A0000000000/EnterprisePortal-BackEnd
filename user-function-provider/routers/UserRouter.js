const Router = require('koa-router')
const router = new Router()
const userService = require('../service/UserService')

router.post('/register', async ctx => {
    // 获取请求体的参数
    let params = ctx.request.body
    // 校验必要参数是否为空
    if (!params || !params.username || !params.password || !params.email) {
        ctx.body = {
            code: 500,
            message: '用户名, 密码, 邮箱为必填项!'
        }
    }
    ctx.body = await userService.register(params)
})

router.post('/login', async ctx => {
    let params = ctx.request.body
    if (!params || !params.username || !params.password) {
        ctx.body = {
            code: 500,
            message: '用户名和密码不能为空.'
        }
    }
    ctx.body = await userService.login(params)
})

router.get('/token', async ctx => {
    const token = ctx.request.header.token
    ctx.body = await userService.paserToken(token)
})

module.exports = router