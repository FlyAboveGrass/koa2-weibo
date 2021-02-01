const { ErrorModel } = require("@/model/resModel")

// 传入验证函数就可以直接作为一个中间件
function genValidator(validatorFn) {
    return async (ctx, next) => {
        const error = validatorFn(ctx.request.body)

        if(error) {
            ctx.body = new ErrorModel(error[0].message)
            return ;
        }
        await next()
    }
}

module.exports = genValidator