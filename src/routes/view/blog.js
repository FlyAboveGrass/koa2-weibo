const router = require('koa-router')()

router.get('/blog', async(ctx, next) => {
    const options = {}
    ctx.render('index', options)
})


module.exports = router