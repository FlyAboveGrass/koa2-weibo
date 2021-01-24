const router = require('koa-router')()
const { isExist, register, login } = require('@/controller/user')
const genValidator = require('@/middleware/validator')
const userValidator = require('@/validator/user')

router.prefix('/api/user')

router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

// 注册
router.post('/register', genValidator(userValidator), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({
        userName,
        password,
        gender
    })
})

userValidator

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