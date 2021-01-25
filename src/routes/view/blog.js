const { loginRedirect } = require('@/middleware/loginCheck')

const router = require('koa-router')()

router.get('/', loginRedirect, async(ctx, next) => {
    await ctx.render('test', {})
})

router.get('/blog', async(ctx, next) => {
    const options = {}
    await ctx.render('index', options)
})

module.exports = router