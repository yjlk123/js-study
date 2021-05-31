import aDefault from './a3.js'

setTimeout(() => {
  console.log('from b.js:', aDefault.a, aDefault.obj.name)
}, 1000)

console.log(aDefault.a, aDefault.obj.name)