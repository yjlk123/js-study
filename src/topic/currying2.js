// 柯里化

// 1.手写柯里化  https://juejin.cn/post/6855129007852093453
// 思路：
// 判断传递的参数是否达到执行函数的fn个数
// 没有达到的话，继续返回新的函数，并且返回curry函数传递剩余参数

let currying = (fn, ...args) =>
    fn.length > args.length ?
        (...arguments) => currying(fn, ...args, ...arguments) :
        fn(...args)

let addSum = (a, b, c) => a + b + c
let add = curry(addSum)
console.log(add(1)(2)(3))
console.log(add(1, 2)(3))
console.log(add(1, 2, 3))
