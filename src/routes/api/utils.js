const { loginCheck } = require('@/middleware/loginCheck')
const koaFrom = require('formidable-upload-koa')
const saveFile = require('@/controller/utils/file')

const router = require('koa-router')()
router.prefix('/api/utils')

router.post('/upload', loginCheck, koaFrom(),  async (ctx, next) => {
    // console.log('file: utils.js ~ line 8 ~ router.post ~ ctx', ctx.req.files);
    const file =  ctx.req.files['file'];
    if(!file) {
        return 
    }

    const { size, path, name, type } = file
    ctx.body = await saveFile({ size, filePath: path, name, type })
})

module.exports = router