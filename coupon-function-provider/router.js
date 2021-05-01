const Router = require('koa-router')
const router = new Router()

router.use('/api/coupon', require('./routers/CouponRouter').routes())
router.use('/api/couponInfo', require('./routers/CouponInfoRouter').routes())

module.exports = router