const Router = require('koa-router')
const router = new Router()

router.use('/api/order', require('./routers/OrderRouter').routes())

module.exports = router