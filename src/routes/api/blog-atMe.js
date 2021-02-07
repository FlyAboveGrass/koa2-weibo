const { Pager } = require('@/conf/constant')
const { getAtMeBlog } = require('@/controller/blog/blog')
const { loginRedirect } = require('@/middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('@/model/resModel')
const { renderBlogListTempl } = require('@/utils/blogUtils')

const router = require('koa-router')()
router.prefix('/api/atMe')

router.get('/loadMore/:pageIndex', loginRedirect, async (ctx, next) => {
    const { id: userId } = ctx.session.userInfo
    const { pageIndex } = ctx.params
    const pager = new Pager()
    pager.pageIndex = pageIndex

    const atMeData = await getAtMeBlog(userId, pager)

    if(!atMeData) {
        ctx.body = new ErrorModel('获取数据失败')
    }

    atMeData.blogListTpl = renderBlogListTempl(atMeData.blogList, true)

    ctx.body = new SuccessModel(atMeData)
})

module.exports = router