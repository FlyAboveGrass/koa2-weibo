const seq = require('@/db/seq')
const { INTEGER } = require('@/db/types')

const UserRelation = seq.define('userRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 id'
    },
    followerId: {
        type: INTEGER,
        allowNull: false,
        comment: '被关注用户的 id'
    }
})

module.exports = UserRelation
