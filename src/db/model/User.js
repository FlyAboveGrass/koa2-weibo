const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')
const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '用户名'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    nickName: {
        type: STRING,
        allowNull: false,
        comment: '昵称'
    },
    picture: {
        type: STRING,
        comment: '头像'
    },
    city: {
        type: STRING,
        comment: '城市'
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 3,
        comment: '性别 1男 2女 3保密'
    },
});

module.exports = User