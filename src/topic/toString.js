// toString 的用法
// 链接：https://juejin.cn/post/6855129007852093453

// 1.实现一个判断对象类型的函数
let isType = (type) => (obj) => Object.prototype.toString.call(obj) === `[object ${type}]`

let isArray = isType('Array') // isType函数属于「偏函数」的范畴，偏函数实际上是返回了一个包含「预处理参数」的新函数。
let isFunction = isType('Function')
console.log(isArray([1,2,3]),isFunction(Map))



// 2.toString 的定义和用法
let func = () => {
    console.log('this is a function');
}

console.log(Object.prototype.toString.call([1,2,3])); // [object Array] // 注意可以用 toString 来判断类型，都不用 typeof
console.log(Object.prototype.toString.call({a: '123'})); // [object Object]
console.log(Object.prototype.toString.call(func)); // [object Function]
