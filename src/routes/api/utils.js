const { loginCheck } = require('@/middleware/loginCheck')
const koaFrom = require('formidable-upload-koa')
const saveFile = require('@/controller/utils/file')

const router = require('koa-router')()
router.prefix('/api/utils')


// 在线上的环境，一般是多个进程同时运行一个服务，这时候如果将文件存在一个进程的文件夹里面是不合理的，需要我们
// 把文件放到同一个资源服务里面，按所有的进程都可以访问
router.post('/upload', loginCheck, koaFrom(),  async (ctx, next) => {
    const file =  ctx.req.files['file'];
    if(!file) {
        return 
    }

    const { size, path, name, type } = file
    ctx.body = await saveFile({ size, filePath: path, name, type })
})

module.exports = router
