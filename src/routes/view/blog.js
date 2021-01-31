const { loginRedirect } = require('@/middleware/loginCheck')
const { getUserInfo } = require('@/services/user')

const router = require('koa-router')()

router.prefix('/blog')

// router.get('/', loginRedirect, async(ctx, next) => {
//     await ctx.render('test', {})
// })

router.get('/', async(ctx, next) => {
    const { userName } = ctx.session.userInfo;
    // 用户信息
    const userInfo = await getUserInfo(userName)

    
    const options = {
        userData: {
            userInfo
        }
    }
    await ctx.render('createBlog', options)
})

router.get('/create', async(ctx, next) => {
    const options = {}
    await ctx.render('index', options)
})

module.exports = router