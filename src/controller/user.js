const { ErrorModel, SuccessModel } = require('../model/resModel')
const { getUserInfo, createUser } = require('../services/user')

async function isExist(userName) {
    const user = await getUserInfo(userName)

    if(user) {
        return new SuccessModel(user)
    }
    return new ErrorModel('用户不存在')
}

async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if(userInfo) {
        return ErrorModel('用户已存在')
    }

    try {
        await createUser({ userName, password, gender })
        return new SuccessModel('注册成功')
    } catch(e) {
        return new ErrorModel('注册失败')
    }
}

async function login(userName, password) {
    const userInfo = await getUserInfo(userName, password)
    console.log('file: user.js ~ line 29 ~ login ~ userInfo', userInfo);

    if(!userInfo) {
        return new ErrorModel('用户不存在')
    }
    return new SuccessModel(userInfo)
}

module.exports = {
    isExist,
    register,
    login
}