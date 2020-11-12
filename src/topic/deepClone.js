// 深拷贝 递归方式
function deepClone(obj) {
    if (typeof obj !== 'object') {
        return obj
    }
    let newObj = obj[key] instanceof Array ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
        }
    }
    return newObj
}