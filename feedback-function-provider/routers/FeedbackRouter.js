const Router = require('koa-router')
const feedbackService = require('../service/FeedbackService')
const router = new Router()

router.post('/addNewFeedback', async ctx => {
    try {
        const token = ctx.request.header.token;
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录'
            }
            return
        }
        if (!ctx.request.body.title || !ctx.request.body.content) {
            ctx.body = {
                code: 500,
                message: '标题或内容不能为空.'
            }
            return
        }
        const params = {
            title: ctx.request.body.title,
            content: ctx.request.body.content,
            createTime: Date.now(),
            status: 0,
            result: null
        }
        ctx.body = await feedbackService.addNewFeedback(params, token)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/getAllFeedback', async ctx => {
    try {
        const token = ctx.request.header.token;
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录'
            }
            return
        }
        ctx.body = await feedbackService.getAllFeedback(token)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.get('/getFeedbacks', async ctx => {
    try {
        const token = ctx.request.header.token
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
            return
        }
        ctx.body = await feedbackService.getFeedbacks(token)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

router.post('/addResult', async ctx => {
    try {
        const token = ctx.request.header.token
        const params = ctx.request.body
        if (!token) {
            ctx.body = {
                code: 500,
                message: '请先登录.'
            }
            return
        }
        if (!params || !params.id || !params.result) {
            ctx.body = {
                code: 500,
                message: '参数不足.'
            }
            return
        }
        ctx.body = await feedbackService.setResult(token, params)
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

module.exports = router