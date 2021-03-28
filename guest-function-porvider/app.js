const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const Cors = require('koa2-cors')
const JsonData = require('./middleware/JsonData')

const app = new Koa()
const router = require('./router')

app.use(JsonData())
app.use(BodyParser())
app.use(Cors())
app.use(router.routes()).use(router.allowedMethods())

app.listen(3003, function () {
    console.log('App is running at http://localhost:3003')
})
