const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const Cors = require('koa2-cors')
const JsonData = require('./middleware/JsonData')

const app = new Koa()
const router = require('./router')

const register = require('./register')

app.use(JsonData())
app.use(BodyParser())
app.use(Cors())
app.use(router.routes()).use(router.allowedMethods())

const params = {
    name: 'user-function-provider',
    url: 'http://localhost',
    port: '3002'
}

const url = 'http://localhost:8000'

app.listen(3001, function () {
    console.log('App is running at http://localhost:3001')
    register(url, params)
})
