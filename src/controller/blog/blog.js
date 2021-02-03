const { Pager } = require("@/conf/constant");
const { Blog } = require("@/db/model");
const { getBlogList } = require("@/services/blog/blog");
const { formatBlog } = require("@/services/_format");
const xss = require('xss')

async function createBlog(userId, content, image) {
    const result = await Blog.create({
        userId,
        content: xss(content),
        image
    })
    return result;
}

async function getBlog(id = null, pager = new Pager()) {
    const result = await getBlogList(id, pager)

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
    getSquareBlog
}