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

export { a, obj } // 1.export { a, obj }  是 es6 的写法，相当于： export { a: a, obj: obj}  
                  // 2.export 是解构，而 export default 不是


