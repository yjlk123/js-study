// 1.关于递归
// flat 和 cloneDeep 发现一个规律（见 test6）：
// 这种递归遍历的，基本格式都是固定的：

// function funA (obj) {
//   let result // 初始化赋值如果既可能是数组也可能是对象就要根据类型初始化了
//   for (let index = 0; index < array.length; index++) {
//     if (条件1 ) { // 一般是判断类型
//       // 对 result 处理
//     } else {
//       // 对 result 处理
//     }
//   }
//   return result
// }

// 真的是这样的，其中 for 可能会换成 reduce 等数组自带的函数，但大框架就是这样的。
// 原因：会用到递归的，肯定不止一层，也就是数据里会有数组或者对象这种引用型的属性，因此一定会使用迭代
