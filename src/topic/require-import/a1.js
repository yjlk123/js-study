// 用于验证解构赋值、require、import 是深拷贝还是浅拷贝
// splice()、concat()、...对数组拷贝时，只有当数组内部属性值不是引用类型是，才能实现深拷贝。

let a = 1
let obj = {
  name: 'hello'
}

setTimeout(() => {
  ++a
  obj.name = 'world'
  console.log('from a.js:', a, obj.name);
}, 500)
 
module.exports = { a, obj } // 注意和 a2.js 的区别。 注意 exports 有 's'
