const { User, UserRelation, AtRelation } = require('@/db/model/index');
const doCrypto = require('@/utils/crypto');

const getUserInfo = async (userName, password) => {
    const options = {
        userName: userName
    }
    if(password) {
        Object.assign(options, { password })
    }
    const users = await User.findOne({
        attribute: ['id', 'userName', 'nickName', 'city', 'gender'],
        where: options
    })
    return users
}

const createUser = async ({ userName, password, gender = 3, nickName, picture }) => {
    const result = await User.create({
        userName,
        password: doCrypto(password),
        nickName: nickName ? nickName : userName,
        gender,
        picture: picture ? picture : ''
    })
    const data = result.dataValues

    return data
}

async function addFollower(curUser, userId) {
    const result = await UserRelation.create({
        userId,
        followerId: curUser
    })
    return result ? result.dataValues : null
}

async function delFollower(curUser, userId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            followerId: curUser
        }
    })
    return result
}

async function createAtRelation(blogId, userId) {
    const result = await AtRelation.create({
        blogId,
        userId,
        isRead: false,
    })
    return result
}

module.exports = {
    getUserInfo,
    createUser,
    addFollower,
    delFollower,
    createAtRelation
}