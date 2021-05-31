import { a, obj } from './a2.js'

setTimeout(() => {
  console.log('from b.js:', a, obj.name)
}, 1000)

console.log(a, obj.name);