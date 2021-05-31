let a = require('./a1.js') // 注意和 b2.js 的区别

setTimeout(() => {
  console.log('from b.js:', a.a, a.obj.name)
}, 1000)

console.log(a.a, a.obj.name);