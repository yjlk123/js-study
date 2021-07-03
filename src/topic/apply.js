// apply 的实现
// apply 的实现跟 call 类似，在这里直接给代码，参考: ./call.js

Function.prototype.apply2 = function (context, arr) {
    // 如果 context 存在，使用 context，如果 context 不存在，使用 window；如果 context 是普通类型，转成对象。
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn(); // 没有参数可以直接这样调用
    }
    else {
        // 第一种调用方式
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
        console.log('参数：', arr, arr instanceof Array, typeof context);

        // 另一种调用方式，不需要 for 循环那段
        // result = eval('context.fn(' + arr + ')') // 这样调用是不行的，会报错，VM1375:1 Uncaught ReferenceError: xiaoyou is not defined at eval (eval at Function.apply1 。
                                                 // 原因是 eval 这个函数会做的操作是，把参数（一定是个数组）里的每一项分解出来运行，不再是一个字符串。比如这里，分解出来就是 xiaoyou 和 21，
                                                 // 会认为是2个变量，所以会报错。但第一种方式就不会，因为 arguments[0], arguments[1] 确实是变量能取到值
    }

    delete context.fn
    return result;
}
  


// 测试
let obj = {
    value: 1
}

function funcA (name, age){
    console.log('name:', name);
    console.log('age:', age);
    console.log('value:', this.value);
}

let params = ['xiaoyou', '21']

funcA.apply2(obj, params)


