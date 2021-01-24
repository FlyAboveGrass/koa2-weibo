const Seqelize = require('sequelize')
const { MYSQL_CONF } = require('@/conf/db')
const { isProd } = require('@/utils/env')

const { host, user, password, database } = MYSQL_CONF

const conf = {
    host,
    dialect: 'mysql'
}

if(isProd) { // 生产环境设置连接池
    conf.pool = {
        max: 5,
        min: 0,
        idle: 10000, //连接池10s没有使用则释放
    }
}

const seq = new Seqelize(database, user, password, conf)

module.exports = seq