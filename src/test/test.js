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

// // reduce
// function useReduce(arr){
//   return arr.reduce((pre, current, index) => {
//     pre.push(current + 1)
//     return pre
//   }, [])
// }

// console.log(useReduce([1, 2, 3]))


// // call
// Function.prototype.myCall = function(obj) {
//   obj.fn = this
//   let args = Array.from(arguments).slice(1)
//   let result = obj.fn(...args) // 别忘了扩展
//   delete obj.fn
//   return result
// }

// let obj = {
//   name: 2
// }
// let name = 0
// function funcA(arg, arg1){
//   console.log(this.name);
//   console.log(arg, arg1);
// }

// // funcA.myCall(obj, '3')

// Function.prototype.myBind = function(obj){
//   let fn = this
//   let param = Array.from(arguments).slice(1)
//   return function(){
//     let allParam = param.concat(Array.from(arguments))
//     return fn.call(obj, ...allParam)
//   }
// }

// funcA.myBind(obj, 5)('3')


// let arr = [1, 2, 3]

// arr.splice(2, 1, 'a')

// console.log(arr);

// let arr = ['0', '79', '255']
// console.log(parseInt(arr[2], 16));




console.log(NaN === NaN); // false
console.log(NaN == NaN); // false
