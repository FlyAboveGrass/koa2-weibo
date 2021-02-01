const DEFAULT_FACE = 'defaultFace.png'

const PAGER = {
    pageIndex: 0,
    pageSize: 5
}

// from '哈喽 @张三 - zhangsan 你好'
// to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
const REG_AT_WHO = /@(.+)\s-\s(\w+)/g


module.exports = {
    DEFAULT_FACE,
    PAGER,
    REG_AT_WHO
}