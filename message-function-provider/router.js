const Router = require('koa-router')
const router = new Router()

router.use('/api/message', require('./routers/MessageRouter').routes())

module.exports = router