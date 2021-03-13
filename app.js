const Koa = require('koa')
const Router = require('koa-router')
const BodyParser = require('koa-bodyparser')
const Cors = require('koa2-cors')
const JsonData = require('./middleware/JsonData')

const app = new Koa()
const router = new Router()

router.use('/api/hello', require('./router/HelloRouter').routes())

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
})

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
})


app.use(JsonData())
app.use(BodyParser())
app.use(Cors())
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('App is running on port 3000!')
    console.log('URL: http://localhost:3000')
})