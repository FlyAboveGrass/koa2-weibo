const path = require('path')
const ejs = require('ejs')
const fs = require('fs')

const BlogList_Templ = fs.readFileSync(path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')).toString()

function renderBlogListTempl(blogList, canReply = false) {
    console.log('file: blogUtils.js ~ line 8 ~ renderBlogListTempl ~ blogList', blogList);
    return ejs.render(BlogList_Templ, {
        blogList,
        canReply
    })
}

module.exports = {
    renderBlogListTempl
}