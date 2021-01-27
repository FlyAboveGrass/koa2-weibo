const router = require('koa-router')()
const { isExist, register, login, changeUserInfo } = require('@/controller/user')
const { loginRedirect } = require('@/middleware/loginCheck')
const genValidator = require('@/middleware/validator')
const { ErrorModel, SuccessModel } = require('@/model/resModel')
const userValidator = require('@/validator/user')

router.prefix('/api/user')

// 注册用户名是否已经存在
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


// 登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(ctx, userName, password)
})

// 用户信息修改
router.patch('/changeInfo', loginRedirect, genValidator(userValidator), async (ctx, next) => {
    const { city, picture, gender, nickName } = ctx.request.body
    const { userName } = ctx.session.userInfo

    const result = await changeUserInfo({ userName }, { city, picture, gender, nickName })
    if(!result) {
        ctx.body = new ErrorModel('用户信息更改失败')
        return 
    }
    Object.assign(ctx.session.userInfo, { city, picture, gender, nickName })
    ctx.body = new SuccessModel(result)
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