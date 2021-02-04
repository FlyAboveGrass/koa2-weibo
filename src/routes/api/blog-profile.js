const { loginCheck } = require('@/middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('@/model/resModel')
const { addFollower, delFollower } = require('@/services/user/user')

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

module.exports = router