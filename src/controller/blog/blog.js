const { Blog } = require("@/db/model")

async function createBlog(userId, content, image) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result;
}


module.exports = {
    createBlog
}