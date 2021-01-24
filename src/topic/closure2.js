// 闭包
// https://www.cnblogs.com/huanghuali/p/9851453.html

// 1.
var name = "The Window";

var object = {
    name: "My Object",

    getNameFunc: function () {
        return function () {
            return this.name;
        };

    }

};

console.log(object.getNameFunc()());

// 2.
var name = "The Window";

var object = {
    name: "My Object",

    getNameFunc: function () {
        var that = this;
        return function () {
            return that.name;
        };

    }

};

console.log(object.getNameFunc()());



// 3. 这道题很有意思，nAdd 函数在全局调用但是居然可以改变 f1 里面的变量，因为它也是一个闭包呀，只是没有用 return 的方式暴露，
// 而是用了赋值到一个全局变量上的方式暴露出 f1 之外了，但和其他闭包一样的呀
function f1 () {

    var n = 999;

    nAdd = function () { n += 1 }

    function f2 () {
        alert(n);
    }

    return f2;

}

var result = f1();

result(); // 999

nAdd();

result(); // 1000

// // 4.
// let obj1 = {
//     name: '听风是风'
// };
// let obj2 = {
//     name: '时间跳跃'
// };
// var name = '行星飞行';

// function fn() {
//     console.log(this.name);
// };
// fn.call(obj1); // 听风
// fn(); // 行星
// fn.apply(obj2); // 时间
// fn(); // 行星
// let boundFn = fn.bind(obj1); // 听风
// boundFn.call(obj2); // 听风
// boundFn.apply(obj2); // 听风
// boundFn.bind(obj2)();



// 5.1练习1
// 对比练习1和2，有点疑惑，但是结合 this 的讲解(https://www.cnblogs.com/echolun/p/11962610.html)就可以知道，原因是在调用这个返回的闭包函数时，
// 前面并没有隐式绑定或者显示绑定的东西，也就是默认绑定了。会有疑问，那个object. 不就是隐式绑定吗？但是仔细看， object. 是对 getNameFunc 这个函数调用时的，而真正返回的那个匿名函数是没有隐式绑定的，一定要仔细看。

var name = "The Window";
var object = {
    name: "My Object",

    getNameFunc: function () {
        return function () {
            return this.name;
        };

    }

};

alert(object.getNameFunc()());


// 5.2练习2
var name = "The Window";

var object = {
    name: "My Object",

    getNameFunc: function () {
        var that = this;
        return function () {
            return that.name;
        };

    }

};

alert(object.getNameFunc()());