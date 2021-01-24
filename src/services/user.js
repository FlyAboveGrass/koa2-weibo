const { User } = require('../db/model/index');
const doCrypto = require('../utils/crypto');

const getUserInfo = async (userName, password) => {
console.log('file: user.js ~ line 4 ~ getUserInfo ~ userName', userName, password);
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
    console.log('users', users);
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
    console.log('file: user.js ~ line 13 ~ createUser ~ data', data);

    return data
}

module.exports = {
    getUserInfo,
    createUser
}