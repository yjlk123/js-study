// 本文件用于测试

// // 1.getName
// function Foo () {
//     this.getName = function () { console.log('1') };
//     return this;
// }
// Foo.getName = function () { console.log('2'); };
// Foo.prototype.getName = function () { console.log('3'); };
// var getName = function () { console.log('4') };
// function getName () { console.log('5'); };

// //打印
// getName();
// Foo.getName();
// getName();
// Foo().getName(); // 如果不 return, 则会报错
// getName(); // 上一步在全局添加了一个 getName 方法
// new (Foo.getName)();
// (new Foo()).getName(); // 注意区分 new Foo() 和 Foo() 之间的区别


// 2.getName

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

Foo.getName();
getName(); 
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
console.log('baidu' && 'google'); // 'google'

// 2, 4, this is window 1, 1, 2, this is object google, this is object google 


// 3.
// function Foo () {
//     getName = function () {
//         console.log(1);
//     };
//     console.log('this is' + this)
//     return this;
// }
// Foo()
// getName()