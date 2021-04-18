const Router = require('koa-router')
const router = new Router()

const civilizationService = require('../service/CivilizationService')

router.get('/getCivilizations', async ctx => {
    ctx.body = await civilizationService.getCivilizations()
})

router.post('/addNewCivilization', async ctx => {
    const params = ctx.request.body
    if (!params || !params.year || !params.month || !params.day || !params.content) {
        ctx.body = {
            status: 'failed',
            message: '参数不全.'
        }
    } else {
        let model = {
            time: new Date(params.year, params.month - 1, params.day, 8, 0, 0),
            content: params.content
        }
        ctx.body = await civilizationService.addNewCivilization(model)
    }
})

module.exports = router