// 继承的几种方式 各例子间互斥


function Animal (name) {
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function () {
        console.log(this.name + '正在睡觉！');
    }
}

// // 1. 原型链继承

// // 定义一个动物类
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
// var cat2 = new Cat();
// console.log(cat.name);
// cat.eat('fish')
// cat.sleep()
// console.log(cat instanceof Animal); //true 
// console.log(cat instanceof Cat); //true

// console.log(cat.name);
// console.log(cat2.name);
// cat.name = '11' // 这样只会在当前实例添加一个元素，不会影响到其他实例
// console.log(cat);
// console.log(cat.__proto__.name);
// console.log(cat2.name);

// // 优缺点

// // 特点：
// // 非常纯粹的继承关系，实例是子类的实例，也是父类的实例
// // 父类新增原型方法/原型属性，子类都能访问到
// // 简单，易于实现

// // 缺点：
// // 要想为子类新增属性和方法，必须要在new Animal()这样的语句之后执行，不能放到构造器中
// // 无法实现多继承
// // 来自原型对象的所有属性被所有实例共享
// // 创建子类实例时，无法向父类构造函数传参  // 确实不行，因为子类里没有接收参数的语句，也没有向上传递的语句。 不过在继承那一刻是可以向父类传参的，即 A 那一句




// // 2.构造继承
// function Cat (name) {
//     Animal.call(this);
//     this.name = name || 'Tom';
// }

// // Test Code
// var cat = new Cat();
// console.log(cat.name);
// cat.sleep()
// console.log(cat instanceof Animal); // false 重点在这里，对比 1
// console.log(cat instanceof Cat); // true

// // 优缺点

// // 特点：
// // 解决了1中，子类实例共享父类属性的问题
// // 创建子类实例时，可以向父类传递参数
// // 可以实现多继承（call多个父类对象）

// // 缺点：
// // 实例并不是父类的实例，只是子类的实例
// // 只能继承父类的实例属性和方法，不能继承原型属性/方法
// // 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能





// // 3.实例继承
// function Cat (name) {
//     var instance = new Animal();
//     instance.name = name || 'Tom';
//     return instance;
// }

// // Test Code
// var cat = new Cat();
// console.log(cat.name);
// cat.sleep()
// console.log(cat instanceof Animal); // true
// console.log(cat instanceof Cat); // false 重点在这里，对比 2

// // 优缺点

// // 特点：
// // 不限制调用方式，不管是new 子类()还是子类(),返回的对象具有相同的效果

// // 缺点：
// // 实例是父类的实例，不是子类的实例
// // 不支持多继承


// // 4.拷贝继承
// function Cat (name) {
//     var animal = new Animal();
//     for (var p in animal) {
//         Cat.prototype[p] = animal[p];
//     }
//     Cat.prototype.name = name || 'Tom'; // 错误的语句，下一句为正确的实现,因为这样写修改了原型对象，会修改父类的 name 属性的值
//     // this.name = name || 'Tom';
// }

// // Test Code
// var cat = new Cat();
// console.log(cat.name);
// cat.sleep()
// console.log(cat instanceof Animal); // false 重点在这里，对比 2
// console.log(cat instanceof Cat); // true

// let cat2 = new Cat()
// cat.name = '111'
// // cat.__proto__.name = '111' //  B
// console.log(cat);
// console.log(cat2); // 这里说明：像上面这种方式改变一个实例的属性并不会修改其他实例的属性,只会在自己实例里添加一个属性， 但是如果是按 B 这种方式来改的话，就会影响到所有的实例了
// console.log(cat.__proto__);
// console.log(cat2.__proto__);
// console.log(cat.name);
// console.log(cat2.name);

// // 优缺点

// // 特点：
// // 支持多继承

// // 缺点：
// // 效率较低，内存占用高（因为要拷贝父类的属性）
// // 无法获取父类不可枚举的方法（不可枚举方法，不能使用for in 访问到）


// 5.组合继承
// 核心：通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用

function Cat (name) {
    Animal.call(this);
    this.name = name || 'Tom';
}
Cat.prototype = new Animal();

// 组合继承也是需要修复构造函数指向的
Cat.prototype.constructor = Cat;

// Test Code
var cat = new Cat();
console.log(cat.name);
cat.sleep()
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true

// 优缺点
// 特点：
// 弥补了方式2的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法
// 既是子类的实例，也是父类的实例
// 不存在引用属性共享问题
// 可传参
// 函数可复用

// 缺点
// 调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）
// 比较推荐，只是多耗费了一点内存