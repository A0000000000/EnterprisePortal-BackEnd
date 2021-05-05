const Router = require('koa-router')
const router = new Router()
const userService = require('../service/UserService')
const urlencode = require('urlencode')

router.post('/register', async ctx => {
    try {
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
    } catch (err) {
        console.log(err)
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.post('/login', async ctx => {
    try {
        let params = ctx.request.body
        if (!params || !params.username || !params.password) {
            ctx.body = {
                code: 500,
                message: '用户名和密码不能为空.'
            }
        }
        ctx.body = await userService.login({ username: params.username, password: params.password })
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.put('/updateInfo', async ctx => {
    try {
        const token = ctx.request.header.token
        let params = ctx.request.body
        ctx.body = await userService.updateInfo(params, token)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/token', async ctx => {
    try {
        const token = ctx.request.header.token
        ctx.body = await userService.paserToken(token)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/getAllUser', async ctx => {
    try {
        const token = ctx.request.header.token
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
            return
        }
        ctx.body = await userService.getAllUser(token)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.post('/addNewUserByAdmin', async ctx => {
    try {
        const token = ctx.request.header.token
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
            return
        }
        ctx.body = await userService.addNewUser(token, ctx.request.body)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/authXMZZ/:id', async ctx => {
    try {
        const token = ctx.request.header.token
        const id = ctx.params.id
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
            return
        }
        ctx.body = await userService.authXMZZ(token, id)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/download/:id', async ctx => {
    try {
        const id = ctx.params.id
        const fileData = await userService.getFile(id)
        if (fileData.code) {
            ctx.body = fileData
        }
        ctx.response.set("content-type", fileData.contentType)
        fileData.filename = urlencode(fileData.filename, "utf-8")
        ctx.response.set("Content-Disposition", "attachment; filename* = UTF-8''" + fileData.filename)
        ctx.flag = true
        ctx.body = fileData.file
    } catch (err) {
        console.log(err)
        ctx.body = {
            code: 500,
            message: err
        }
    }
})


module.exports = router