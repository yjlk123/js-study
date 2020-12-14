// 本文件用作练习，有一些地方是错误的，也就是易错的需要注意的点

// 1.throttle

// function throttle (fn, delay) {
//     let flag = true
//     let timer
//     let context = this
//     if (!flag) {
//         return
//     }
//     flag = false
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//         flag = true
//         fn.call(context, ...args)
//     }, delay)
// }



// // debounce
// function debounce () {
//     let timer
//     return function (...args) {
//         let context = this
//         if (timer) {
//             clearTimeout(timer)
//         }
//         timer = setTimeout(() => {
//             flag = true
//             fn.apply(context, args)
//         }, delay)
//     }
// }



// function Foo () {
//     getName = function () { // 到全局
//         console.log(1);
//     };
//     console.log('this is' + this)
//     return this;
// }
// Foo()
// getName()
