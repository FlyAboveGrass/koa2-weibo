const fse = require('fs-extra')
const path = require('path')
const { ErrorModel, SuccessModel } = require("@/model/resModel")


// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 文件最大体积 1M
const MIX_SIZE = 1024 * 1024 * 1024

// 上传头像
async function saveFile({ size, filePath, name, type }) {
    if(size > MIX_SIZE) {
        await fse.remove(filePath)
        return new ErrorModel('文件过大')
    }
    // 移动文件
    const fileName = Date.now() + '.' + name // 防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // 目的地
    await fse.move(filePath, distFilePath)

    // 返回信息
    return new SuccessModel({
        url: '/' + fileName
    })
}

module.exports = saveFile