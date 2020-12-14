// type

let a = true
let b = typeof a
let c = Object.prototype.toString.call(a)

console.log(typeof b); // string
console.log(c); // [object Boolean]