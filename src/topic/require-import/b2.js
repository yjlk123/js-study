import { a, obj } from './a2.js' // 注意和 b1.js 的区别

setTimeout(() => {
  console.log('from b.js:', a, obj.name)
}, 1000)

console.log(a, obj.name);