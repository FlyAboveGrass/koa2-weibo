const Koa = require('koa')
const app = new Koa()
require('module-alias/register');
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaStatic = require('koa-static')
const koaMount=require('koa-mount')
const path = require('path')
const redisStore = require('koa-redis')
const session = require('koa-generic-session')
const { REDIS_CONF } = require('./conf/db')
const { SESSION_KEY } = require('./conf/secret-key')


const userApiRouter = require('@/routes/api/user')
const blogApiRouter = require('@/routes/api/blog')
const utilsApiRouter = require('@/routes/api/utils')
const squareApiRouter = require('@/routes/api/blog-square')

const userViewRouter = require('@/routes/view/user')
const blogViewRouter = require('@/routes/view/blog')
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

// 如果没有在public里面找到，就回去uploadFiles里面找
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.resolve(__dirname, '..') + '/uploadFiles'))

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
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(blogApiRouter.routes(), blogApiRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(squareApiRouter.routes(), squareApiRouter.allowedMethods())

app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
