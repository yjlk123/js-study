// 将多维数组转换为一维数组

// // 1.自己的写法，不用指定层级，任何层级都可以，但是效率可能慢一些吧
// function myFlat (arr) {
//     let result = []
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] instanceof Array) {
//             result = result.concat(myFlat(arr[i]))
//         } else {
//             result.push(arr[i])
//         }
//     }
//     return result
// }

// let a = [1, 2, 3, [4, 5, 6, [8, 9]], 7]

// let b = myFlat(a)
// console.log(b)


// 2. reduce    注意：记得 return 
// https://juejin.cn/post/6855129007852093453#heading-6
function myFlat1 (arr) {
    return arr.reduce((rec, current)=> {
        if(current instanceof Array){
            return [...rec, ...myFlat1(current)]
        } else {
            return [...rec, current]
        }
    }, [])
}
let a = [1, 2, 3, [4, 5, 6, [8, 9]], 7]

let b = myFlat1(a)
console.log(b)



// 3.较简洁方式
// https://juejin.cn/post/6855129007852093453#heading-6
// 指定要提取嵌套数组的结构深度，默认值为 1
function flatDeep(arr, d = 1) {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
    []) :
        arr.slice();
};

// var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
// flatDeep(arr1, Infinity);


