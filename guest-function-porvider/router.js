const Router = require('koa-router')
const router = new Router()

router.use('/api/introduction', require('./routers/IntroductionRouter').routes())

module.exports = router