const getSquareCache = require('@/cache/squareCache');
const { Pager } = require('@/conf/constant');
const { getBlog } = require('@/controller/blog/blog');
const { getFans, getFollowers } = require('@/controller/user/profile');
const { isExist } = require('@/controller/user/user');
const { loginRedirect } = require('@/middleware/loginCheck');
const { followed } = require('@/services/user/profile');
const { getUserInfo } = require('@/services/user/user')

const router = require('koa-router')()

// router.prefix('/blog')

// router.get('/', loginRedirect, async(ctx, next) => {
//     await ctx.render('test', {})
// })

router.get('/', loginRedirect, async (ctx, next) => {
    const { id: userId, userName } = ctx.session.userInfo;
    // 用户信息
    const userInfo = await getUserInfo(userName)

    // 博客信息
    const blogData = await getBlog(userId)


    const options = {
        userData: {
            userInfo
        },
        blogData
    }
    await ctx.render('index', options)
})

router.get('/blog/create', async(ctx, next) => {
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

router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    // 已登录用户的信息
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    // 当前用户信息
    let curUserInfo
    const { userName: curUserName } = ctx.params
    const { id: curUserId } = await getUserInfo(curUserName)
    const isMe = myUserName === curUserName
    let amIFollowed = true
    if (isMe) {
        // 是当前登录用户
        curUserInfo = myUserInfo
    } else {
        // 不是当前登录用户
        const existResult = await isExist(curUserName)
        if (existResult.code !== 0) {
            // 用户名不存在
            return
        }
        // 用户名存在
        curUserInfo = existResult.data

        // 我是否关注了此人
        amIFollowed = await followed(myUserInfo.id, curUserId)
    }

    // 个人博客信息
    const blogData = await getBlog(curUserId)

    // 粉丝信息
    const fansData = await getFans(curUserId)

    // 我关注的
    const followersData = await getFollowers(curUserId)

    

    await ctx.render('profile', {
        blogData,
        userData: {
            userInfo: curUserInfo,
            isMe,
            amIFollowed,
            atCount: 12,
            fansData,
            followersData
        },

    })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
    const pager = new Pager()
    // 获取微博数据，第一页
    const blogData = await getSquareCache(pager)
    const { isEmpty, blogList, pageSize, pageIndex, count } = blogData || {}

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})


module.exports = router