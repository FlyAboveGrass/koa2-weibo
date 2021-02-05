const { Pager } = require('@/conf/constant')
const { getBlog } = require('@/controller/blog/blog')
const { loginCheck } = require('@/middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('@/model/resModel')
const { addFollower, delFollower, getUserInfo } = require('@/services/user/user')
const { renderBlogListTempl } = require('@/utils/blogUtils')

const router = require('koa-router')()
router.prefix('/api/profile')

router.post('/follow', loginCheck, async (ctx, next) => {
    const { userId } = ctx.request.body
    const { id: curUser } = ctx.session.userInfo

    const result = await addFollower(curUser, userId)

    ctx.body = result ? new SuccessModel(result) : new ErrorModel('关注失败')
})

router.post('/unFollow', loginCheck, async (ctx, next) => {
    const { userId } = ctx.request.body
    const { id: curUser } = ctx.session.userInfo
    const result = await delFollower(curUser, userId)
    
    ctx.body =  result ? new SuccessModel(result) : new ErrorModel('取消关注失败')
})

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
    const { userName, pageIndex } = ctx.params
    const pager = new Pager()
    pager.pageIndex = Number.parseInt(pageIndex)

    const { id: curUserId } = await getUserInfo(userName)

    const blogData = await getBlog(curUserId, pager)
    if(!blogData) {
        ctx.body = new ErrorModel('加载失败')
    }

    blogData.blogListTpl = renderBlogListTempl(blogData.blogList)
    ctx.body = new SuccessModel(blogData)
})

module.exports = router