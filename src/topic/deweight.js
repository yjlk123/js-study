// 数组去重
// 有很多方法

// 1. Set
let unique1 = arr => [...new Set(arr)] // new 出来的是一个 Set 对象，因为把这个对象一一展开了，又放进数组里了，所以变成了数组
console.log(unique1([1, 2, 3, 4, 5, 2, 5]));

// 2.filter
let unique2 = function (arr) {
    let result = arr.filter((item, index, arr) => {
        return arr.indexOf(item) === index
    })
    return result
}
console.log(unique2([1, 2, 3, 4, 5, 2, 5]));


// reduce
// 注意：初始参数传的是 []，后面才会一直传 [] 下去
let unique3 = arr => arr.reduce((pre, cur) => pre.includes(cur) ? pre : [...pre, cur], []);
console.log(unique3([1, 2, 3, 4, 5, 2, 5]));


// Object 键值对
function unique5(array) {
    var obj = {};
    return array.filter(function (item, index, array) {
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true) // ??? 这里有个问题不明白，为啥 (obj[typeof item + item] = true) 可以返回 true, 这不是个赋值操作吗？会有返回吗？
    })
}
console.log(unique5([1, 2, 3, 4, 5, 2, 5]));

