// 以下内容是对该链接的记录，讲得超级好，层层递进：https://www.cnblogs.com/echolun/p/12178655.html

// 觉得本文不好理解的话可以先看 bind-this2-2.js


// 5.自己实现 bind, bind 还可以用 new 的方式调用，但是这样就会让 myBind 这个函数里的 this 丢失
// 通过bind返回的boundFunction函数也能通过new运算符构造，只是在构造过程中，boundFunction已经确定的this会被忽略，且返回的实例还是会继承构造函数的构造器属性与原型属性，并且能正常接收参数。
var z = 0;
var obj = {
    z: 1
};

function fn (x, y) {
    this.name = '听风是风';
    console.log(this.z);
    console.log(x);
    console.log(y);
};
fn.prototype.age = 26;

var bound = fn.bind(obj, 2);
var person = new bound(3); // undefined 2 3

console.log(person.name); // 听风是风
console.log(person.age); // 26
// 由于所有的构造函数除了可以使用new构造调用以外，它还能被普通调用，比如上面例子中的bound我们也可以普通调用，但是这个结果就和 new 构造方式的结果完全不同了：

bound(3); // 1 2 3  
// 解析：

// 除了先前绑定好的this丢失了（后面会解释原因），构造器属性this.name，以及原型属性fn.prototype.age都有顺利继承，除此之外，两个形参也成功传递进了函数。

// 当构造函数被new构造调用时，本质上构造函数中会创建一个实例对象，函数内部的this指向此实例，当执行到console.log(this.z)这一行时，this上并未被赋予属性z，所以输出undefined，这也解释了为什么bound函数被new构造时会丢失原本绑定的this。

// 是不是觉得ES5构造函数特别混乱，不同调用方式函数内部this指向还不同，也正因如此在ES6中隆重推出了class类，凡是通过class创建的类均只能使用new调用，普通调用一律报错处理：
class Fn {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    };
    sayName () {
        console.log(this.name);
    };
};
//只能new构造调用
const person = new Fn('听风是风', 26);
person.sayName(); //听风是风
const person1 = Fn(); //Class constructor Fn cannot be invoked without 'new'





// 为了解决对原型上的实例修改属性时，其他所有实例也会有影响的问题，加入一个空白函数做中介
function Fn () {
    this.name = '听风是风';
    this.sayAge = function () {
        console.log(this.age);
    };
};
Fn.prototype.age = 26;
// 创建一个空白函数Fn1，单纯的拷贝Fn的prototype
var Fn1 = function () { };
Fn1.prototype = Fn.prototype;
// 这里的Fn2对应我们的bound方法，将其原型指向Fn1创建的实例
var Fn2 = function () { };
Fn2.prototype = new Fn1();
var o = new Fn2();
console.log(o.age); //26
//尝试修改
o.__proto__.age = 18;
var o1 = new Fn();
console.log(o1.age);//26