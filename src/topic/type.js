// type

// 1.
let a = true
let b = typeof a
let c = Object.prototype.toString.call(a)

console.log(typeof b); // string
console.log(c); // [object Boolean]


// 2.
function g1 () {
    // console.log(typeof g1()) // 会报错
    return 23;
}
let f = function g2 () {
    return 23;
}
console.log(typeof g1());
console.log(typeof f());
console.log(typeof g2()); // 会报错，这种形式叫做命名的函数表达式，它的名字 g2 只在函数体内可见，在函数外部不可见。运行后 g 就没有了

// 3.