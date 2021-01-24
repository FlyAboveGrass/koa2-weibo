const Ajv = require('ajv')

let ajv = new Ajv({});

// 验证函数
function _validate(schema, data) {
    let valid = ajv.validate(schema, data)
    if (!valid) return ajv.errors
}

module.exports = _validate

