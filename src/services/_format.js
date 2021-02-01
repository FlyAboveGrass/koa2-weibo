const deepClone = require("./utils/clone")
const timeFormat = require("./utils/timeFormat")

// from '哈喽 @张三 - zhangsan 你好'
// to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
const REG_AT_WHO = /@(.+)\s-\s(\w+)/g

function formatBlog(blog) {
    if(!blog) {
        return blog
    }
    blog = deepClone(blog)

    blog.createdAtFormat = timeFormat(blog.createdAt)
    blog.updatedAtFormat = timeFormat(blog.updatedAt)

    // replace里面会把 正则表达式（）的子串作为参数 传递给传入的回调函数. 第一个参数是匹配的全部内容
    blog.contentFormat = blog.content.replace(REG_AT_WHO, (matchStr, nickName, userName) => {
        return `<a href="/profile/${userName}">@${nickName}</a>`
    })

    return blog
}

module.exports = {
    formatBlog
}