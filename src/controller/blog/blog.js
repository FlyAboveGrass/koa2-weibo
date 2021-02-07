const { Pager, REG_AT_WHO } = require("@/conf/constant");
const { Blog } = require("@/db/model");
const { getBlogList, getBlogAboutMe, updateAtRelation } = require("@/services/blog/blog");
const { getUserInfo, createAtRelation } = require("@/services/user/user");
const { formatBlog } = require("@/services/_format");
const xss = require('xss')
const { getAtMeBlogList } = require('@/services/blog/blog')

async function createBlog(userId, content, image) {
    let atUserList = []
    content = content.replace(
        REG_AT_WHO,
        (matchStr, nickName, userName) => {
            // 这一步不对 @语句进行格式化，只是提取出来@的人进行数据库的存贮
            atUserList.push(userName)
            return matchStr
        }
    )
    // 错误的写法
    // atUserList = atUserList.map(async (userName) => {
    //     const { id: userId } = await getUserInfo(userName)
    //     return userId
    // })


    // 错误的写法， 存入promise.all的函数是箭头函数， 这个箭头函数并不是一个promise
    // atUserList = await Promise.all(
    //     atUserList.map((userName) => {
    //         const { id: userId } = getUserInfo(userName)
    //         return userId
    //     })
    // )
    atUserList = await Promise.all(
        atUserList.map((userName) => getUserInfo(userName))
    )
    atUserList = atUserList.map(userInfo => userInfo.id)

    const blog = await Blog.create({
        userId,
        content: xss(content),
        image
    })

    await createAtRelation(blog.id, userId)

    return blog;
}

async function getBlog(id = null, { pager = new Pager(), includeFollow = false}) {
    let result = null
    if(!includeFollow) {
        result = await getBlogList(id, pager)
    } else {
        result = await getBlogAboutMe(id, pager)
    }
    

    let { count, rows: blogList } = result
    blogList = blogList.map(item => {
        return formatBlog(item)
    })
    
    return {
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: pager.pageSize,
        pageIndex: pager.pageIndex,
        count   
    }
}

async function getAtMeBlog(userId, pager = new Pager()) {
    const result = await getAtMeBlogList(userId, pager)

    let { count, rows: blogList } = result
    blogList = blogList.map(item => {
        return formatBlog(item)
    })
    
    return {
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: pager.pageSize,
        pageIndex: pager.pageIndex,
        count
    }
}

async function markReaded(userId) {
    const result = await updateAtRelation({ isRead: true}, { userId, isRead: false})
}

async function getSquareBlog(pager = new Pager()) {
    const result = await getSquareCache(pager)
    const blogList = result.blogList || []

    return {
        blogList,
        isEmpty: blogList.length > 0,
        count: result.count,
        pageIndex: pager.pageIndex,
        pageSize: pager.pageSize
    }
}

module.exports = {
    createBlog,
    getBlog,
    getAtMeBlog,
    getSquareBlog,
    markReaded
}