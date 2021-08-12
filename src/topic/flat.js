// 将多维数组转换为一维数组

// // 1.自己的写法，不用指定层级，任何层级都可以，但是效率可能慢一些吧
// function myFlat (arr) {
//     let result = []
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] instanceof Array) {
//             result = result.concat(myFlat(arr[i])) // 递归的重点在于返回值，这个返回值既要能处理当前多种条件，还要传给下一层时能用。细品 result
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
    // 知识点：concat 的参数可以是一个具体的值，也可以是数组，还可以多个数组，很灵活了
    // 注意 concat 的括号到哪里结束，借助光标查看
    // 关于层级：如果传进这个函数时层级为0了，那么就直接把当前函数复制一下返回
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
    []) :
        arr.slice();
};

// var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
// flatDeep(arr1, Infinity);


