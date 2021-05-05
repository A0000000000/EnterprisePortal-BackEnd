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
    name: 'feedback-function-provider',
    url: 'http://192.144.232.33',
    port: '3003'
}

const url = 'http://192.144.232.33:8000'

app.listen(3003, function () {
    console.log('App is running at http://192.144.232.33:3003')
    register(url, params)
})
