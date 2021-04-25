const Router = require('koa-router')
const router = new Router()

router.use('/api/feedback', require('./routers/FeedbackRouter').routes())

module.exports = router