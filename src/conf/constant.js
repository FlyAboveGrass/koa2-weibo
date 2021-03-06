const DEFAULT_FACE = 'defaultFace.png'

const PAGER = {
    pageIndex: 0,
    pageSize: 5
}

// 以Pager的常量来，各个实例会共享，一个修改了另一个也跟着修改
// 以类的方式创建，每次都会返回一个新的实例
class Pager {
    constructor(pageIndex = 0, pageSize = 5) {
        this.pageIndex = pageIndex
        this.pageSize = pageSize
    }
}

// from '哈喽 @张三 - zhangsan 你好'
// to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
const REG_AT_WHO = /@(.+)\s-\s(\w+)/g


const SQUARE_CACHE_PREFIX = 'weibo:square'

module.exports = {
    DEFAULT_FACE,
    PAGER,
    Pager,
    REG_AT_WHO,
    SQUARE_CACHE_PREFIX
}