const Router = require('koa-router')
const router = new Router()

router.use('/api/user', require('./routers/UserRouter').routes())
router.use('/api/location', require('./routers/LocationRouter').routes())

module.exports = router