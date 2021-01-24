const { User } = require('@/db/model/index');
const doCrypto = require('@/utils/crypto');

const getUserInfo = async (userName, password) => {
    const options = {
        userName: userName
    }
    if(password) {
        Object.assign(options, { password })
    }
    console.log('options', options);
    const users = await User.findOne({
        attribute: ['userName', 'nickName', 'city', 'gender'],
        where: options
    })
    return users
}

const createUser = async ({ userName, password, gender = 3, nickName }) => {
    const result = await User.create({
        userName,
        password: doCrypto(password),
        nickName: nickName ? nickName : userName,
        gender
    })
    const data = result.dataValues

    return data
}

module.exports = {
    getUserInfo,
    createUser
}