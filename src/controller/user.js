const { User } = require('@/db/model')
const { ErrorModel, SuccessModel } = require('@/model/resModel')
const { getUserInfo, createUser } = require('@/services/user')
const doCrypto = require('@/utils/crypto')

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

async function login(ctx, userName, password) {
    const userInfo = await getUserInfo(userName, doCrypto(password))

    if(!userInfo) {
        return new ErrorModel('用户不存在')
    }

    ctx.session.userInfo = userInfo
    return new SuccessModel(userInfo)
}

async function changeUserInfo({userName}, { city, picture, gender, nickName }) {
    if(!userName) {
        return null
    }

    let newUserInfo = {}
    if(city) newUserInfo.city = city
    if(picture) newUserInfo.picture = picture
    if(gender) newUserInfo.gender = gender
    if(nickName) newUserInfo.nickName = nickName

    const result = await User.update(newUserInfo, {
        where: {
            userName
        }
    });
    return result&&result.length > 0 ? result[0] : null
}

async function changePassword(userName, password, newPassword) {
    console.log('file: user.js ~ line 59 ~ changePassword ~ userName, password, newPassword', userName, password, newPassword);
    const result = await User.update({
        password: doCrypto(newPassword)
    }, {
        where: { userName, password: doCrypto(password) }
    })
    console.log('file: user.js ~ line 66 ~ changePassword ~ result', result);

    return result&&result[0] ? Boolean(result[0]) : false
}

module.exports = {
    isExist,
    register,
    login,
    changeUserInfo,
    changePassword
}