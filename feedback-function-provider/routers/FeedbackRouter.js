const Router = require('koa-router')
const feedbackService = require('../service/FeedbackService')
const router = new Router()

router.post('/addNewFeedback', async ctx => {
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
})

router.get('/getAllFeedback', async ctx => {
    const token = ctx.request.header.token;
    if (!token) {
        ctx.body = {
            code: 500,
            message: '请先登录'
        }
        return
    }
    ctx.body = await feedbackService.getAllFeedback(token)
})

module.exports = router