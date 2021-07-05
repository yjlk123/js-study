// parseInt 是将字符串转成数字，第一个参数是目标字符串，但是第二个参数是指定当前数据的进制数，注意不是指要转换成什么进制，所以不能用它来做进制转换

let arr = ['0', '79', '255']
console.log(parseInt(arr[2], 16)) // 597

// https://blog.csdn.net/tuohai_/article/details/70138759
console.log(parseInt(072, 8));

console.log(parseInt("010", 8)) // 8
console.log(parseInt("010", 16)) // 16
console.log(parseInt("010", 2)) // 2
console.log(parseInt("010")) // 10
console.log(parseInt("0x10")) // 16

console.log(['1', '2', '3'].map(parseInt)) // [1, NaN, NaN] '3' 大于 进制2的最大值 2

console.log(typeof [1,2]) 




