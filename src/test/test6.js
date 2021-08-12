// 1.flat
// 1.1方法1
function myFlat (arr) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      result = result.concat(myFlat(arr[i]))
    } else {
      result.push(arr[i])
    }

    // 不会三目运算符就整简单的行不？还想秀一把，把自己秀逗了吧
    // result = arr[i] instanceof Array ? result.concat(myFlat(arr[i])) : result.push(arr[i])
  }
  return result
}





// // 方法2 reduce + 扩展函数
// function myFlat (arr) {
//   let result = []
//   result = arr.reduce((pre, cur, index) => {

//     // 这样写根本不会给 pre concat 上 myFlat() 的结果
//     // cur instanceof Array ? [].concat.call(pre, myFlat(cur)) : [].push.call(pre, cur)
//     let tmp = []

//     tmp = cur instanceof Array ? [...pre, ...myFlat(cur)] : [...pre, cur]

//     return tmp // 记得要返回，不返回会报错：Uncaught TypeError: Cannot convert undefined or null to object
//   }, [])
//   return result
// }



// // 方法3 reduce + 三目运算符，我就不信了，三目为啥不行
// function myFlat (arr) {
//   let result = []
//   result = arr.reduce((pre, cur, index) => {

//     // 这样写根本不会给 pre concat 上 myFlat() 的结果。
//     // 因为如果不接收三目运算符的结果，而是返回 pre 和话，concat 不会对原有数组改变，而是返回一个新的数组，所以 pre 还是改变之前的数组
//     // cur instanceof Array ? [].concat.call(pre, myFlat(cur)) : [...pre, cur]
//     // return pre

//     let tmp = []
//     tmp = cur instanceof Array ? [].concat.call(pre, myFlat(cur)) : [...pre, cur]
//     return tmp // 记得要返回，不返回会报错：Uncaught TypeError: Cannot convert undefined or null to object
//   }, [])
//   return result
// }


// let a = [1, 2, 3, [4, 5, 6, [8, 9]], 7]

// let b = myFlat(a)
// console.log(b)


// 2.cloneDeep
function myCloneDeep (obj) {
  let tmpObj = obj instanceof Array ? [] : {}
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      tmpObj[key] = myCloneDeep(obj[key])
    } else {
      tmpObj[key] = obj[key]
    }
  }
  return tmpObj
}

let c = {
  a: '1',
  b: {
    d: '2',
    e: '3',
    g: ['7', '8']
  },
  f: ['5', '6']
}
console.log(myCloneDeep(c));