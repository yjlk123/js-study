// call 和 apply 的实现
// https://github.com/mqyqingfeng/Blog/issues/11

// 1.第一版 给 foo 对象添加一个属性，这个属性就是函数 bar, 调用完再删掉即可。注意区别 bind 的实现， bind 实现里用了 call，而这里是要实现 call, 所以当然不能照抄 bind 的实现思路
Function.prototype.call2 = function (context) {
    // 首先要获取调用call的函数，用this可以获取
    context.fn = this;
    context.fn();
    delete context.fn;
}

// 测试一下
var foo = {
    value: 1
};

function bar () {
    console.log(this.value);
}

bar.call2(foo); // 1


// 2.第二版 能够传递参数并调用
Function.prototype.call2 = function(context) {
    context.fn = this;
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    eval('context.fn(' + args +')');
    delete context.fn;
}

// 测试一下
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call2(foo, 'kevin', 18); 
// kevin
// 18
// 1


// 3.第三版 当是由 null 对象时默认指向 window, 而且有的函数有返回值
Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}

// 测试一下
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call2(null); // 2

console.log(bar.call2(obj, 'kevin', 18));
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }