const seq = require('@/db/seq')
require('@/db/model')

seq.authenticate().then(() => {
    console.log('数据库验证成功')
}).catch(() => {
    console.log('数据库验证失败');
})

// 执行同步
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()
})