const Koa = require('koa')
const BodyParser = require('koa-body')
const Cors = require('koa2-cors')
const JsonData = require('./middleware/JsonData')

const register = require('./register')

const app = new Koa()
const router = require('./router')

app.use(JsonData())
app.use(BodyParser({
    enableTypes: ['json', 'form', 'text'],
    multipart: true
}))
app.use(Cors())
app.use(router.routes()).use(router.allowedMethods())

const params = {
    name: 'guest-function-provider',
    url: 'http://localhost',
    port: '3002'
}

const url = 'http://localhost:8000'

app.listen(3002, function () {
    console.log('App is running at http://localhost:3002')
    register(url, params)
})
