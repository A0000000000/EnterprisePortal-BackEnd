const Router = require('koa-router')
const router = new Router()
const userService = require('../service/UserService')

router.post('/register', async ctx => {
    // 获取请求体的参数
    let params = ctx.request.body
    // 校验必要参数是否为空
    if (!params || !params.username || !params.password || !params.email || !params.role) {
        ctx.body = {
            code: 500,
            message: '用户名, 密码, 邮箱, 身份为必填项!'
        }
    }
    if (params.role === 'Enterprise') {
        params.file = ctx.request.files.file
        if (!params.file) {
            ctx.body = {
                code: 500,
                message: '认证材料不能为空'
            }
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
    ctx.body = await userService.login({ username: params.username, password: params.password })
})

router.put('/updateInfo', async ctx => {
    const token = ctx.request.header.token
    let params = ctx.request.body
    ctx.body = await userService.updateInfo(params, token)
})



router.get('/token', async ctx => {
    const token = ctx.request.header.token
    ctx.body = await userService.paserToken(token)
})

module.exports = router