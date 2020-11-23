// 继承相关 各例子间互斥

// // 1. 原型链继承

// // 定义一个动物类
// function Animal (name) {
//     // 属性
//     this.name = name || 'Animal';
//     // 实例方法
//     this.sleep = function () {
//         console.log(this.name + '正在睡觉！');
//     }
// }
// // 原型方法
// Animal.prototype.eat = function (food) {
//     console.log(this.name + '正在吃：' + food);
// };

// function Cat () {
// }
// function Dog () {
// }
// Cat.prototype = new Animal(); // A
// Cat.prototype.name = 'cat';

// //　Test Code
// var cat = new Cat();
// console.log(cat.name);
// cat.eat('fish')
// cat.sleep()
// console.log(cat instanceof Animal); //true 
// console.log(cat instanceof Cat); //true


// // 优缺点

// // 特点：
// // 非常纯粹的继承关系，实例是子类的实例，也是父类的实例
// // 父类新增原型方法/原型属性，子类都能访问到
// // 简单，易于实现

// // 缺点：
// // 要想为子类新增属性和方法，必须要在new Animal()这样的语句之后执行，不能放到构造器中
// // 无法实现多继承
// // 来自原型对象的所有属性被所有实例共享（来自原型对象的引用属性是所有实例共享的）（详细请看附录代码： 示例1）
// // 创建子类实例时，无法向父类构造函数传参  // 确实不行，因为子类里没有接收参数的语句，也没有向上传递的语句。 不过在继承那一刻是可以向父类传参的，即 A 那一句




// 2.构造继承
function Animal (name) {
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function () {
        console.log(this.name + '正在睡觉！');
    }
}
function Cat (name) {
    Animal.call(this);
    this.name = name || 'Tom';
}

// Test Code
var cat = new Cat();
console.log(cat.name);
cat.sleep()
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true

// 优缺点

// 特点：
// 解决了1中，子类实例共享父类属性的问题
// 创建子类实例时，可以向父类传递参数
// 可以实现多继承（call多个父类对象）

// 缺点：
// 实例并不是父类的实例，只是子类的实例
// 只能继承父类的实例属性和方法，不能继承原型属性/方法
// 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能