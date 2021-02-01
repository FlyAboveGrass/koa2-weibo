const { PAGER } = require("@/conf/constant");
const { Blog, User, UserRelation } = require("@/db/model/index");

async function getBlogList(userId, pager = PAGER) {
    try {
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
                    where: { id: userId }
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
    getBlogList
}