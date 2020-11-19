// 梳理几种创建对象方式对应的原型链

// 1. 构造器方式生成对象
function A (name){
    this.name = name
}

let a = new A('小 a')

console.log(a.__proto__);
console.log(A.__proto__ === Function.prototype); // true

console.log('------------------------');

// 2.对象字面量方式生成对象
let b = {}
console.log(b.__proto__)


console.log('------------------------');

// 3.Object.create() 方式生成对象
let c1 = {}
let c2 = Object.create(c1)
console.log(c2.__proto__ === c1); // true





// 4.Function.prototype 是唯一一个typeof XXX.prototype为 function的prototype。

console.log(typeof Function.prototype ); // function 因为 Function.prototype 指向 Function
console.log(typeof Object.prototype); // object  因为 Object.prototype 也是个对象
console.log(typeof Date.prototype); // object  因为 Object.prototype 也是个对象
