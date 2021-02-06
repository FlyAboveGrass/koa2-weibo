const { Pager } = require('@/conf/constant')
const { getBlog } = require('@/controller/blog/blog')
const { SuccessModel } = require('@/model/resModel')
const { renderBlogListTempl } = require('@/utils/blogUtils')

const router = require('koa-router')()

router.prefix('/api/square')

router.get('/loadMore/:pageIndex', async (ctx, next) => {
    const { pageIndex } = ctx.params
    const pager = new Pager()
    pager.pageIndex = Number.parseInt(pageIndex)

    const result = await getBlog(null, {pager})
    result.blogListTpl = renderBlogListTempl(result.blogList, false)
    ctx.body = new SuccessModel(result)
})


module.exports = router