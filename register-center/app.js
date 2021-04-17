const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const Cors = require('koa2-cors')
const JsonData = require('./middleware/JsonData')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const ServiceMapper = {}

app.use(JsonData())
app.use(BodyParser())
app.use(Cors())

router.get('/', async ctx => {
    ctx.body = {
        status: 'success',
        message: '成功.',
        data: ServiceMapper
    }
})

router.post('/api/register', async ctx => {
    const params = ctx.request.body
    if (!params || !params.name || !params.url || !params.port) {
        ctx.body = {
            status: 'failed',
            message: '参数为空.'
        }
    } else {
        ServiceMapper[params.name] = {
            url: params.url,
            port: params.port,
            time: Date.now()
        }
        console.log(params.name, '注册成功.')
        ctx.body = {
            status: 'success',
            message: '成功.'
        }
    }
})

router.get('/api/flush/:name', async ctx => {
    const name = ctx.params.name
    if (ServiceMapper[name]) {
        ServiceMapper[name].time = Date.now()
        ctx.body = {
            status: 'success',
            message: '成功.'
        }
    } else {
        ctx.body = {
            status: 'failed',
            message: '微服务未注册.'
        }
    }
})

router.get('/api/serviceMapper', async ctx => {
    ctx.body = {
        status: 'success',
        message: '成功.',
        data: ServiceMapper
    }
})

router.get('/api/service/:name', async ctx => {
    const name = ctx.params.name
    if (ServiceMapper[name]) {
        ctx.body = {
            status: 'success',
            message: '成功.',
            data: ServiceMapper[name]
        }
    } else {
        ctx.body = {
            status: 'failed',
            message: '微服务不存在.'
        }
    }
})

router.get('/api/remove/:name', async ctx => {
    const name = ctx.params.name
    delete ServiceMapper[name]
    ctx.body = {
        status: 'success',
        message: '成功.'
    }
})

setInterval(function () {
    let keys = Object.keys(ServiceMapper)
    for (key in keys) {
        if (Date.now() - ServiceMapper[keys[key]].time > 5000) {
            console.log(keys[key], '从注册信息中移除')
            delete ServiceMapper[keys[key]]
        }
    }
}, 5000)

app.use(router.routes()).use(router.allowedMethods())

app.listen(8000, function () {
    console.log('Register is running at http://localhost:8000')
})