const Koa = require('koa')
const app = new Koa()
require('module-alias/register');
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')
const redisStore = require('koa-redis')
const session = require('koa-generic-session')
const { REDIS_CONF } = require('./conf/db')
const { SESSION_KEY } = require('./conf/secret-key')

const index = require('@/routes/index')
const users = require('@/routes/users')
const userApiRouter = require('@/routes/api/user')
const userViewRouter = require('@/routes/view/user')
const errorViewRouter = require('@/routes/view/error')


// error handler
let errorConf = {
    redirect: '/error'
}
onerror(app, errorConf)

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(path.join(__dirname, '/views'), {
    extension: 'ejs'
}))

app.keys = [SESSION_KEY]
app.use(session({
    key: 'weibo.sid',
    prefix: 'weibo:sess',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
