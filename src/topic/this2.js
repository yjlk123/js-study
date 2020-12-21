// this 的几种绑定方式
// https://www.cnblogs.com/echolun/p/11962610.html
// https://www.cnblogs.com/billyu/p/10063823.html


// 1
// function fn() {
//     console.log(this); //window
//     console.log(this.name); // '听风是风'
// };

// function fn1() {
//     "use strict";
//     console.log(this); //undefined
//     console.log(this.name);
// };

// var name = '听风是风';

// fn(); 
// fn1() //TypeError: Cannot read property 'a' of undefined

// // 2.如果在严格模式下调用不在严格模式中的函数，并不会影响this指向 这个有点费解？？？？
// var name = '听风是风';
// function fn() {
//     console.log(this); //window
//     console.log(this.name); //听风是风
// };

// (function () {
//     "use strict";
//     fn();
// }());


// // 3.对象属性引用链中只有最顶层或者说最后一层会影响调用位置。
// function foo() {
//     console.log(this.a);
// }
// var obj2 = {
//     a: 42,
//     foo: foo
// };
// var obj1 = {
//     a: 2,
//     obj2: obj2
// };
// obj1.obj2.foo(); // 42


// // 4.1 如果函数调用前存在多个对象，this指向距离调用自己最近的对象，比如这样：
// function fn() {
//     console.log(this.name);
// };
// let obj = {
//     name: '行星飞行',
//     func: fn,
// };
// let obj1 = {
//     name: '听风是风',
//     o: obj
// };
// obj1.o.func() //行星飞行


// // 4.2 那如果我们将obj对象的name属性注释掉，现在输出什么呢？
// // 这里输出undefined，大家千万不要将作用域链和原型链弄混淆了，obj对象虽然obj1的属性，但它两原型链并不相同，并不是父子关系，由于obj未提供name属性，所以是undefined
// function fn() {
//     console.log(this.name);
// };
// let obj = {
//     func: fn,
// };
// let obj1 = {
//     name: '听风是风',
//     o: obj
// };
// obj1.o.func()


// // 4.3 原型链相关， 对比 4.2
// // 知识点：
// // 作用域链与原型链的区别：
// // 当访问一个变量时，解释器会先在当前作用域查找标识符，如果没有找到就去父作用域找，作用域链顶端是全局对象window，如果window都没有这个变量则报错。
// // 当在对象上访问某属性时，首选i会查找当前对象，如果没有就顺着原型链往上找，原型链顶端是null，如果全程都没找到则返一个undefined，而不是报错。
// function Fn() {};
// Fn.prototype.name = '时间跳跃';

// function fn() {
//     console.log(this.name);
// };

// let obj = new Fn();
// obj.func = fn;

// let obj1 = {
//     name: '听风是风',
//     o: obj
// };
// obj1.o.func()


// // 5.隐式丢失
// // 在特定情况下会存在隐式绑定丢失的问题，最常见的就是作为参数传递以及变量赋值，先看参数传递

// // 5.1
// // 这个例子中我们将 obj.fn 也就是一个函数传递进 fn1 中执行，这里只是单纯传递了一个函数而已，this并没有跟函数绑在一起，所以this丢失这里指向了window
// var name = '行星飞行';
// let obj = {
//     name: '听风是风',
//     fn: function () {
//         console.log(this.name);
//     }
// };

// function fn1(param) {
//     param();
// };
// fn1(obj.fn); // 行星飞行

// // 5.2 第二个引起丢失的问题是变量赋值，其实本质上与传参相同
// var name = '行星飞行';
// let obj = {
//     name: '听风是风',
//     fn: function () {
//         console.log(this.name);
//     }
// };
// let fn1 = obj.fn;
// fn1(); // 行星飞行


// // 5.3 注意，隐式绑定丢失并不是都会指向全局对象，比如下面的例子
// // 虽然丢失了 obj 的隐式绑定，但是在赋值的过程中，又建立了新的隐式绑定，这里this就指向了对象 obj1。
// var name = '行星飞行';
// let obj = {
//     name: '听风是风',
//     fn: function () {
//         console.log(this.name);
//     }
// };
// let obj1 = {
//     name: '时间跳跃'
// }
// obj1.fn = obj.fn;
// obj1.fn(); //时间跳跃


// // 6.显示绑定
// let obj1 = {
//     name: '听风是风'
// };
// let obj2 = {
//     name: '时间跳跃'
// };
// let obj3 = {
//     name: 'echo'
// }
// var name = '行星飞行';

// function fn() {
//     console.log(this.name);
// };
// fn();
// fn.call(obj1);
// fn.apply(obj2); 
// fn.bind(obj3)(); 



// // 7.new

// // 准确来说，js中的构造函数只是使用new 调用的普通函数，它并不是一个类，最终返回的对象也不是一个实例，只是为了便于理解习惯这么说罢了。
// // 那么new一个函数究竟发生了什么呢，大致分为三步：
// // 1.以构造器的prototype属性为原型，创建新对象；
// // 2.将this(可以理解为上句创建的新对象)和调用参数传给构造器，执行；
// // 3.如果构造器没有手动返回对象，则返回第一步创建的对象
// // 这个过程我们称之为构造调用，我们来看个例子：
// // 在这段代码中，构造调用创建了一个新对象echo，而在函数体内，this将指向新对象echo上（可以抽象理解为新对象就是this）。

// function Fn(){
//     this.name = '听风是风';
// };
// let echo = new Fn();
// echo.name//听风是风



// // 8. this 绑定的优先级
// // 显式绑定 > 隐式绑定 > 默认绑定
// // new绑定 > 隐式绑定 > 默认绑定
// // 为什么显式绑定不和new绑定比较呢？因为不存在这种绑定同时生效的情景，如果同时写这两种代码会直接抛错，所以大家只用记住上面的规律即可。
// // 8.1
// function Fn(){
//     this.name = '听风是风';
// };
// let obj = {
//     name:'行星飞行'
// }
// let echo = new Fn().call(obj); // 报错 call is not a function


// // 8.2
// // 那么我们结合几个例子来验证下上面的规律，首先是显式大于隐式：
// //显式>隐式
// let obj = {
//     name:'行星飞行',
//     fn:function () {
//         console.log(this.name);
//     }
// };
// obj1 = {
//     name:'时间跳跃'
// };
// obj.fn.call(obj1);// 时间跳跃



// // 8.3 其次是new绑定大于隐式：
// //new>隐式
// obj = {
//     name: '时间跳跃',
//     fn: function () {
//         this.name = '听风是风';
//     }
// };
// let echo = new obj.fn();
// echo.name;//听风是风


// 9. 箭头函数
// ES6的箭头函数是另类的存在，为什么要单独说呢，这是因为箭头函数中的this不适用上面介绍的四种绑定规则。

// 准确来说，箭头函数中没有this，箭头函数的this指向取决于外层作用域中的this，外层作用域或函数的this指向谁，箭头函数中的this便指向谁。有点吃软饭的嫌疑，一点都不硬朗，我们来看个例子：

function fn() {
    return () => {
        console.log(this.name);
    };
}
let obj1 = {
    name: '听风是风'
};
let obj2 = {
    name: '时间跳跃'
};
let bar = fn.call(obj1); // fn this指向obj1
bar.call(obj2); //听风是风

// 9.1
// 为啥我们第一次绑定this并返回箭头函数后，再次改变this指向没生效呢？
// 前面说了，箭头函数的this取决于外层作用域的this，fn函数执行时this指向了obj1，所以箭头函数的this也指向obj1。除此之外，箭头函数this还有一个特性，那就是一旦箭头函数的this绑定成功，也无法被再次修改，有点硬绑定的意思。
// 当然，箭头函数的this也不是真的无法修改，我们知道箭头函数的this就像作用域继承一样从上层作用域找，因此我们可以修改外层函数this指向达到间接修改箭头函数this的目的。

function fn() {
    return () => {
        console.log(this.name);
    };
};
let obj1 = {
    name: '听风是风'
};
let obj2 = {
    name: '时间跳跃'
};
fn.call(obj1)(); // fn this指向obj1,箭头函数this也指向obj1
fn.call(obj2)(); //fn this 指向obj2,箭头函数this也指向obj2



