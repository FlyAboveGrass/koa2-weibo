const router = require('koa-router')()

router.get('/session-test', async (ctx, next) => {
    if(!ctx.session || !ctx.session.viewCount) {
        ctx.session.viewCount = 0
    }
    ctx.session.viewCount ++
    ctx.body = {
        viewCount: ctx.session.viewCount
    }
})

module.exports = router