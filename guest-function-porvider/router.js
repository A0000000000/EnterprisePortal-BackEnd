const Router = require('koa-router')
const router = new Router()

router.use('/api/introduction', require('./routers/IntroductionRouter').routes())
router.use('/api/culture', require('./routers/CultureRouter').routes())
router.use('/api/civilization', require('./routers/CivilizationRouter').routes())

module.exports = router