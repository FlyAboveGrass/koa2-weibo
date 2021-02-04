const { Pager } = require("@/conf/constant")
const { getFansList, getFollowerList } = require("@/services/user/profile")

async function getFans(userId, pager = new Pager(0,10)) {
    const fanData = await getFansList(userId, pager)

    return fanData ? {
        count: fanData.count,
        list: fanData.fansList
    } : {
        count: 0,
        list: []
    }
}

async function getFollowers(userId, pager = new Pager(0,10)) {
    const followersData = await getFollowerList(userId, pager)

    return followersData ? {
        count: followersData.count,
        list: followersData.followerList
    } : {
        count: 0,
        list: []
    }
}

module.exports = {
    getFans,
    getFollowers
}