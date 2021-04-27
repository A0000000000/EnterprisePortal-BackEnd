const Router = require('koa-router')
const router = new Router()

router.use('/api/good', require('./routers/GoodRouter').routes())

module.exports = router