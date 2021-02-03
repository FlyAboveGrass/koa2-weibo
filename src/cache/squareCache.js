const { Pager, SQUARE_CACHE_PREFIX } = require("@/conf/constant");
const { getBlog } = require("@/controller/blog/blog");
const { get, set } = require("./_redis");



async function getSquareCache(pager = new Pager()) {
    const key = `${SQUARE_CACHE_PREFIX}${pager.pageIndex}_${pager.pageSize}`
    const blogCache = await get(key)

    if(blogCache) {
        return blogCache
    }

    const squareData = getBlog(null, pager)
    
    set(key, squareData, 1)

    return squareData
}

module.exports = getSquareCache