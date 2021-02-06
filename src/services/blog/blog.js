const { Pager } = require("@/conf/constant");
const { Blog, User, UserRelation, AtRelation } = require("@/db/model/index");
const { Op } = require('sequelize');
const { getFollowerList } = require("../user/profile");

async function getBlogList(userId, pager = new Pager()) {
    try {
        const searchOpt = {}
        if(userId) {
            Object.assign(searchOpt, { id: userId })
        }

        const result = await Blog.findAndCountAll({ 
            limit: pager.pageSize,
            offset: pager.pageSize * pager.pageIndex,
            // 排序方式
            order: [
                ['id', 'desc']
            ],
            // 连表查询
            include: [
                { 
                    model: User,
                    attribute: ['userName', 'nickName', 'picture'],
                    where: searchOpt
                }
            ]
        })

        result.rows = result.rows.map((item) => {
            data = item.dataValues
            data.user = data.user.dataValues
            return data
        })
        return {
            count: result.count,
            rows: result.rows
        }
    } catch(e) {
        throw e
    }
}

async function getBlogAboutMe(userId, pager = new Pager()) {
    const myBlog = await Blog.findAndCountAll({
        limit: pager.pageSize,
        offset: pager.pageSize * pager.pageIndex,
        // 排序方式
        order: [
            ['id', 'desc']
        ],
        // 连表查询
        include: [
            { 
                model: User,
                attribute: ['userName', 'nickName', 'picture'],
                where: {
                    id: userId
                }
            },
        ]
    })

    let followUserList = await getFollowerList(userId)
    followUserList = followUserList.followerList.map(follower => follower.id)

    const atMeBlog = await Blog.findAndCountAll({
        limit: pager.pageSize,
        offset: pager.pageSize * pager.pageIndex,
        // 排序方式
        order: [
            ['id', 'desc']
        ],
        // 连表查询
        include: [
            { 
                model: User,
                attribute: ['userName', 'nickName', 'picture'],
                where: {
                    id: {
                        [Op.or]: followUserList
                    }
                }
            }
        ]
    })
    
    myBlog.rows = myBlog.rows.map((item) => {
        data = item.dataValues
        data.user = data.user.dataValues
        return data
    })

    atMeBlog.rows = atMeBlog.rows.map((item) => {
        data = item.dataValues
        data.user = data.user.dataValues
        return data
    })

    return {
        count: myBlog.count + atMeBlog.count,
        rows: [...myBlog.rows, ...atMeBlog.rows]
    }
}

async function getAtMeBlogList(userId, pager = new Pager()) {
    try {
        const searchOpt = {}
        if(userId) {
            Object.assign(searchOpt, { id: userId })
        }

        const result = await Blog.findAndCountAll({
            limit: pager.pageSize,
            offset: pager.pageSize * pager.pageIndex,
            // 排序方式
            order: [
                ['id', 'desc']
            ],
            // 连表查询
            include: [
                { 
                    model: User,
                    attribute: ['userName', 'nickName', 'picture'],
                },
                {
                    model: AtRelation,
                    attribute: ['userId', 'blogId'],
                    where: { userId }
                }
            ]
        })

        result.rows = result.rows.map((item) => {
            data = item.dataValues
            data.user = data.user.dataValues
            return data
        })

        return {
            count: result.count,
            rows: result.rows
        }
    } catch(e) {
        throw e
    }
}

module.exports = {
    getBlogList,
    getBlogAboutMe,
    getAtMeBlogList
}