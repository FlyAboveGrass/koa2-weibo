const { PAGER } = require("@/conf/constant");
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

async function getBlog(id = null, pager = PAGER) {
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

module.exports = {
    createBlog,
    getBlog
}