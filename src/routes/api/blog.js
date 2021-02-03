const { Pager } = require('@/conf/constant')
const { createBlog, getBlog } = require('@/controller/blog/blog')
const { loginRedirect } = require('@/middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('@/model/resModel')
const { renderBlogListTempl } = require('@/utils/blogUtils')

const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/loadMore/:pageIndex', async (ctx, next) => {
    const { pageIndex } = ctx.params
    const page = new Pager()
    page.pageIndex = Number.parseInt(pageIndex)

    const { id: userId } = ctx.session.userInfo

    const result = await getBlog(userId, page)

    result.blogListTpl = renderBlogListTempl(result.blogList)
    ctx.body = new SuccessModel(result)
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