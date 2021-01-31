const { createBlog } = require('@/controller/blog/blog')
const { loginRedirect } = require('@/middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('@/model/resModel')

const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/', async (ctx, next) => {
    
})
router.post('/create', loginRedirect, async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id } = ctx.session.userInfo

    const result = await createBlog(id, content, image)

    if(result) {
        ctx.body = new SuccessModel(result)
        return
    }
    ctx.body = new ErrorModel(result)
})

module.exports = router