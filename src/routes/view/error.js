const router = require('koa-router')()

// 故意制造一个错误
router.get('/get-error', async (ctx, next) => {
    throw Error()
    ctx.body = {
        msg: 'xxx'
    }
})

router.get('/error', async (ctx, nexr) => {
    await ctx.render('error')
})

// 404的路由应该匹配的是*
router.get('*', async (ctx, nexr) => {
    await ctx.render('404')
})

module.exports = router