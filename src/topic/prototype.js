// var jQuery = function (selector){
//     return new jQuery.fn.init(selector)
// }


// 1.跳舞厂面试题

// function Foo(){
//     this.getName = function(){console.log('1')};
//     return this;
// }
// Foo.getName = function() { console.log('2'); };
// Foo.prototype.getName=function(){console.log('3');};
// var getName=function(){console.log('4')};
// function getName(){console.log('5');};

// //打印
// Foo.getName(); 
// getName(); 
// Foo().getName(); // 如果不 return, 则会报错
// getName(); // 上一步在全局添加了一个 getName 方法
// new (Foo.getName)(); 
// (new Foo()).getName(); // 注意区分 new Foo() 和 Foo() 之间的区别
// // 2 4 1 1 2 1


// 2. https://blog.csdn.net/qq_34306360/article/details/79104645
function Foo() {
    getName = function () {
        console.log(1);
    };
    console.log('this is' + this)
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log('baidu' && 'google');
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}

// // 请写出以下的输出结果 
// Foo.getName();
// getName();
// debugger
// Foo().getName();
// getName();
// new Foo.getName();
// new Foo().getName();
// new new Foo().getName();
// console.log('baidu' && 'google');
// console.log('baidu' || 'google');




// 分析：
// 优先级：成员访问 > new > 函数调用， 在这里是：new Foo() >  Foo() > new Foo  ，尽管.的优先级高，但()并不能被.调用，所以会将new Foo()的值求出来再去.getName
// new 之后返回的是一个对象，所以构造函数里返回的是这个新的对象，即 this 变成了 'object', 而不再是 window
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // this is[object Window], 1
getName(); // 1
new Foo.getName(); // 2    优先级： (new (Foo.getName))()  就算删掉 () 输出结果也没变化，意思是 () 没有起作用？??????
new Foo().getName(); // this is[object Object], google    尽管.的优先级高，但()并不能被.调用，所以会将new Foo()的值求出来再去.getName // 有个小技巧，首先找属性调用的 ".", 然后看 new , 一定要给它分配一个最近的 (), 然后最后顺序是函数调用
new new Foo().getName(); // this is[object Object], google     new ((new Foo()).getName)() => new (foo.getName)()
console.log('baidu' && 'google'); // 'google' 因为是 &&, 所以每一项都要判断
console.log('baidu' || 'google'); // 'baidu' 因为是 ||， 所以只判断第一项即可

// 2, 4, this is window, 1, 1, 2, this is[object Object], google, this is[object Object], google







// // 3.原型，继承相关
// function Animal(){
//     let name = 'animal' // 改成 this, 实例才能访问到这个属性，否则是 undefined
// }
// let cat = new Animal()
// console.log(cat.name)