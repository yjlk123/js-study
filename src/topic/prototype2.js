// 原型链相关



// 1，2，3 梳理几种创建对象方式对应的原型链, 只要一提到 __proto__, 就反应出以下3种情况，来分类
// 1. 构造器方式生成对象
function A (name) {
    this.name = name
}

let a = new A('小 a')

console.log(a.__proto__);
console.log(A.__proto__ === Function.prototype); // true
console.log(a.constructor === A)
console.log(a.constructor === A.prototype.constructor)

console.log('------------------------1');


// 2.对象字面量方式生成对象
let b = {}
console.log(b.__proto__)
console.log(b.constructor === Object)
console.log(b.constructor === Object.prototype.constructor)


console.log('------------------------2');


// 3.Object.create() 方式生成对象
// 这是第3种情况，其实是链接在第2种情况后面的，想象一下图即可知道
let c1 = {}
let c2 = Object.create(c1)
console.log(c2.__proto__ === c1); // true
console.log(c2.__proto__ === c2.constructor.prototype); // false
console.log(c2.__proto__ === c1.constructor); // false
console.log(c2.__proto__ ); // {}
console.log(c2.constructor === c1.constructor) // true
console.log(c1.constructor === Object) // true


console.log('------------------------3');



// 4.Function.prototype 是唯一一个typeof XXX.prototype为 function的prototype。
// 知识点：一个实例对象其实本身是没有 constructor 属性的，而是通过原型链找到 Person.prototype 上的 constructor 属性

console.log(typeof Function.prototype); // function 特例，记住
console.log(typeof Object.prototype); // object  因为 Object.prototype 也是个对象
console.log(typeof Date.prototype); // object  因为 Object.prototype 也是个对象
console.log(Function.prototype.__proto__ === Object.prototype) // true ！！！属于上面第2种情况，因为所有的原型对象 XXX.prototype 都当成普通对象来看就好
console.log(Array.prototype.__proto__ === Object.prototype) // true ！！！= 属于上面第2种情况，因为所有的原型对象 XXX.prototype 都当成普通对象来看就好



// 5.所有对象的 __proto__ 都指向其构造器的 prototype，由哪个构造出来的，就指向哪个构造器的原型对象

var obj = { name: 'jack' }
var arr = [1, 2, 3]
var reg = /hello/g
var date = new Date
var err = new Error('exception')

console.log(obj.__proto__ === Object.prototype) // true
console.log(arr.__proto__ === Array.prototype)  // true
console.log(reg.__proto__ === RegExp.prototype) // true
console.log(date.__proto__ === Date.prototype)  // true
console.log(err.__proto__ === Error.prototype)  // true


// 6.关于构造器的 __proto__
Object.__proto__ === Function.prototype // true
Function.__proto__ === Function.prototype // true


// 7.typeof 使用时，不能通过原型链像公式一样来判断，方法是直接兑换成它是个啥，是个对象，还是函数，还是 null, 来得出结果



// 8.手动改变原型后的各种结果
function Person (name) {
    this.name = name
}
// 重写原型
Person.prototype = {
    getName: function () { }
}

let p = new Person('jack')
console.log(p.__proto__ === Person.prototype); // true
console.log(p.__proto__ === p.constructor.prototype); // false  如果不手动改原型，这个等式对所有的都成立，但是改了原型，这个等式就不成立了。改了原型的话， p.__proto__ 仍指向 Person.prototype, 但不指向 p.construcotr.prototype 了
console.log(p.constructor.prototype === Object.prototype); // true


console.log('*************************');
// 9.Object.create 方式创建的对象，更改原对象，会影响其他的实例吗？？？？？？？
// (1)
let d1 = {
    name: 'original'
}
let d2 = Object.create(d1)
let d3 = Object.create(d1)

// 这两行就是为了验证，如果是改源对象的属性值会影响到所有的实例，但如果只改其中一个实例的属性，不会影响别的实例
// d2.name = '123'
d1.name = '123'
console.log(d2.name);
console.log(d3.name);



// (2)
function Animal () {
    this.name = 'animal' // 改成 this, 实例才能访问到这个属性，否则是 undefined
}
let cat1 = new Animal()
let cat2 = new Animal()
cat1.name = 'namee1'
console.log(cat1.name)
console.log(cat2.name)
