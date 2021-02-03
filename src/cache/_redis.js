const { REDIS_CONF } = require('@/conf/db')
const redis = require('redis')

const redisClient = redis.createClient(REDIS_CONF)

redisClient.on('error', (e) => {
    console.log(e);
})

function set(key, value, timeout = 60 * 60) {
    if(typeof(value) === 'object') {
        value = JSON.stringify(value)
    }
    redisClient.set(key, value)
    redisClient.expire(key, timeout)
}

function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, data) => {
            if(err) {
                reject(err)
            }
            if(data === null) {
                resolve(null)
                return 
            }

            try {
                resolve(JSON.parse(data))
            } catch(e) {
                resolve(data)
            }
        })
    })
}


module.exports = {
    get,
    set
}