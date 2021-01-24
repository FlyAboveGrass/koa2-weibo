const crypto = require('crypto')
const { PASSWORD_CRYPTO_KEY } = require('../conf/secret-key')

// 加密算法
function _md5(content) {
    const md5 = crypto.createHash('md5') // 使用MD5加密
    return md5.update(content).digest('hex') // 加密内容，使用16进制
}

// 使用密钥加密
function doCrypto(content) {
    const str = `content=${content}&key=${PASSWORD_CRYPTO_KEY}`
    return _md5(str)
}

module.exports = doCrypto