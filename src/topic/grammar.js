// 1.数组扁平化

let arr = [1, 2, [3, 4, [5]]]

// // 方法1： reduce
// const flatten = arr => {
//   return arr.reduce((pre, cur) => {
//     // debugger
//     return pre.concat(Array.isArray(cur) ? flatten(cur) : cur); // [3, 4, [5]] 是一个元素，会走第一个判断条件
//   }, [])
// }
// const res4 = flatten(arr);


// // 方法2: 
// // 写法1
// const res5 = []; // 全局的
// const fn = arr => {
//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       fn(arr[i]);
//     } else {
//       res5.push(arr[i]);
//     }
//   }
// }
// fn(arr);



// // 写法2：递归 思路是将 reduce 拆开写，所以递归时要往里传上一次的，并返回对这个参数改变后的的结果。可以当做公式来记忆--递归的写法公式

// let res5 = [];
// let fn = (arr, res) => {
//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       res = res.concat(fn(arr[i], []))
//     } else {
//       res.push(arr[i]);
//     }
//   }
//   // debugger 父级调用和子集返回的交界线，可以在这里打断点看
//   return res
// }
// res5 = fn(arr, [])

// console.log(res5);


// // 写法3： 错误的写法！！！！！！！！！
// let res5 = [];
// let fn = (arr) => {
//   let res = []
//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       res = [].concat(fn(arr[i]))
//     } else {
//       res.push(arr[i]);
//     }
//   }
//   return res
// }
// res5 = fn(arr)

// console.log(res5);