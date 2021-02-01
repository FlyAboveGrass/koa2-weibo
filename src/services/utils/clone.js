function deepClone(obj) {
    try{
        return JSON.parse(JSON.stringify(obj))
    } catch(e) {
        return obj
    }
}

module.exports = deepClone