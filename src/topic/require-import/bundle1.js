(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
let a = require('./a1.js') // 注意和 b2.js 的区别

setTimeout(() => {
  console.log('from b.js:', a.a, a.obj.name)
}, 1000)

console.log(a.a, a.obj.name);
},{"./a1.js":1}]},{},[2]);
