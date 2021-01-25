const { ErrorModel } = require("@/model/resModel")

async function loginCheck(ctx, next) {
    if(ctx.session && ctx.session.userInfo) {
        await next()
        return 
    }
    ctx.body = new ErrorModel('您尚未登录')
}

async function loginRedirect(ctx, next) {
    if(ctx.session && ctx.session.userInfo) {
        await next()
        return 
    }
    await ctx.redirect('/login')
}


module.exports = {
    loginCheck,
    loginRedirect
}