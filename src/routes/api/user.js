const router = require('koa-router')()
const { isExist, register, login } = require('../../controller/user')

router.prefix('/api/user')

router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

// 注册
router.post('/register', async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({
        userName,
        password,
        gender
    })
})

// 登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(userName, password)
})

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