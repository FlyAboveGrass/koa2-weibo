const { Pager } = require("@/conf/constant")
const { UserRelation, User } = require("@/db/model")

async function getFansList(userId, pager = new Pager(0,10)) {
    const result = await User.findAndCountAll({
        limit: pager.pageSize,
        offset: pager.pageIndex * pager.pageSize,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                attribute: ['nickName', 'picture', 'userName'],
                where: { userId }
            }
        ]
    })
    fansList = result.rows.map(fan => fan.dataValues)
    console.log('file: profile.js ~ line 20 ~ getFansList ~ fansList', fansList);
    return {
        count: result.count,
        fansList
    }
}

async function getFollowerList(userId, pager = new Pager(0, 10)) {
    const result = await User.findAndCountAll({
        limit: pager.pageSize,
        offset: pager.pageIndex * pager.pageSize,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                attribute: ['nickName', 'picture', 'userName'],
                where: { followerId: userId }
            }
        ]
    })

    followerList = result.rows.map(follower => follower.dataValues)

    return {
        count: result.count,
        followerList
    }
}

async function followed(myUserName, curUserName) {
    const result = await UserRelation.findOne({
        where: {
            userId: curUserName,
            followerId: myUserName
        }
    })

    return result ? true : false
}

module.exports = {
    getFansList,
    getFollowerList,
    followed
}