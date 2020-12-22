// this 相关的题目 https://www.cnblogs.com/echolun/p/11969938.html

// 1.
/*非严格模式*/

var name = 'window'

var obj1 = {
    name: '听风是风',
    fn1: function () {
        console.log(this.name)
    },
    fn2: () => console.log(this.name),
    fn3: function () {
        return function () {
            console.log(this.name)
        }
    },
    fn4: function () {
        return () => console.log(this.name)
    }
}
var obj2 = {
    name: '行星飞行'
};

obj1.fn1(); // 听风是风  普通函数的隐式绑定
obj1.fn1.call(obj2); // 行星飞行  普通函数的显式绑定

obj1.fn2(); // w    // 箭头函数并没有自己的this，它的this指向由上层执行上下文中的this决定. 对象obj1并不是一个函数，它并没有权利创建自己的上下文，所以没有自己的this，那么它的外层是谁呢？当然是全局window啦
obj1.fn2.call(obj2); // w   // 箭头函数的this由外部环境决定，且一旦绑定无法通过call，apply或者bind再次改变箭头函数的this，所以这里虽然使用了call方法但依旧无法修改，所以this还是指向window

obj1.fn3()(); // w fn3 的 this 虽然是指向 obj1, 但是和里面返回的那个函数并没有关系，返回的不是箭头函数，不需要根据外部函数决定this，返回的函数被调用时前面也没有 '.'. 是个闭包，等同于: var fn = obj1.fn3();  fn(); 即默认绑定
obj1.fn3().call(obj2); // 行星飞行
obj1.fn3.call(obj2)(); // 这种有2个()的, 最好的办法就是拆分来看。即返回的是个函数时，用这种拆分的方式来分析。没有2个(), 有两个 '.' 的也可以拆开

obj1.fn4()(); // 听风是风
obj1.fn4().call(obj2); // 听风是风
obj1.fn4.call(obj2)(); // 行星飞行 虽然无法直接改变箭头函数的this，但可以通过修改上层上下文的this达到间接修改箭头函数this的目的




// 2.
/*非严格模式*/
var name = 'window'

function Person(name) {
  this.name = name;
  this.fn1 = function () {
    console.log(this.name);
  };
  this.fn2 = () => console.log(this.name);
  this.fn3 = function () {
    return function () {
      console.log(this.name)
    };
  };
  this.fn4 = function () {
    return () => console.log(this.name);
  };
};

var obj1 = new Person('听风是风');
console.dir(obj1);
var obj2 = new Person('行星飞行');

obj1.fn1(); // 听风是风
obj1.fn1.call(obj2); // 行星飞行

obj1.fn2(); // 
obj1.fn2.call(obj2); // 

obj1.fn3()(); // 
obj1.fn3().call(obj2); // 行星飞行
obj1.fn3.call(obj2)();

obj1.fn4()();
obj1.fn4().call(obj2);
obj1.fn4.call(obj2)();





// 3. 闭包
// 下面这个构造函数，实例是没办法访问 name 属性的，因为这是构造函数里的本地变量，并没有 this.name = '听风是风', 所以访问不到，但是因为 sayName 方法是个闭包，所以实例上能访问到 name 的值，即
// sayName 函数能正确返回 name 的值

function Fn(){
    var name = '听风是风';
    this.sayName = function () {
        console.log(name);
    };
};
var obj = new Fn();
obj.sayName();//？