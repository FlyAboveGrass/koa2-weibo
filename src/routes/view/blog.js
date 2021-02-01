const { getBlog } = require('@/controller/blog/blog')
const { getUserInfo } = require('@/services/user')

const router = require('koa-router')()

router.prefix('/blog')

// router.get('/', loginRedirect, async(ctx, next) => {
//     await ctx.render('test', {})
// })

router.get('/', async (ctx, next) => {
    const { id: userId, userName } = ctx.session.userInfo;
    // 用户信息
    const userInfo = await getUserInfo(userName)

    // 博客信息
    const blogData = await getBlog(userId)
    console.log('file: blog.js ~ line 19 ~ router.get ~ blogData', blogData);




    


    const options = {
        userData: {
            userInfo
        },
        blogData
    }
    await ctx.render('index', options)
})

router.get('/create', async(ctx, next) => {
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



module.exports = router