const Koa = require('koa')
const BodyParser = require('koa-body')
const Cors = require('koa2-cors')
const JsonData = require('./middleware/JsonData')

const app = new Koa()
const router = require('./router')

const register = require('./register')

app.use(JsonData())
app.use(BodyParser({
    enableTypes: ['json', 'form', 'text'],
    multipart: true
}))
app.use(Cors())
app.use(router.routes()).use(router.allowedMethods())

const params = {
    name: 'order-function-provider',
    url: 'http://localhost',
    port: '3007'
}

const url = 'http://localhost:8000'

app.listen(3007, function () {
    console.log('App is running at http://localhost:3007')
    register(url, params)
})
