// call 和 apply 的实现
// https://github.com/mqyqingfeng/Blog/issues/11

// 1.第一版 给 foo 对象添加一个属性，这个属性就是函数 bar, 调用完再删掉即可。注意区别 bind 的实现， bind 实现里用了 call，而这里是要实现 call, 所以当然不能照抄 bind 的实现思路
Function.prototype.call2 = function (context) {
    // 首先要获取调用call的函数，用this可以获取.整体思路是给 context 添加一个属性，这个属性就是 bar, 相当于把 bar 接到 context 的某个属性下，并调用
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
    for(var i = 1, len = arguments.length; i < len; i++) { // arguments 是个类数组，有迭代器，但不是真正的数组. 注意参数从第二个开始取，第一个参数只作为 this
        args.push('arguments[' + i + ']'); // 不能用 Array.prototype.slice.call 因为这里就是要实现 call
    }
    console.log('参数：', args); // ["arguments[1]", "arguments[2]"]
    // eval('context.fn(' + args +')');
    // context.fn(args) // 这样是无法正确调用的，必须按上面的方式写，因为 arguments 存在 args 里只是字符串，只有 eval 是才会执行获取参数
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

