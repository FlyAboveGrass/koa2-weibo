class BasicModel {
    constructor(code, data, message) {
        this.code = code
        this.data = data
        this.message = message
    }
}

class SuccessModel extends BasicModel {
    constructor(data = {}) {
        super(0, data)
    }
}

class ErrorModel extends BasicModel {
    constructor(msg) {
        super(-1, null, msg)
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}