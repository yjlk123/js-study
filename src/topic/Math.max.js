// Math.max() 只能一个个传入，不能传入数组

// 1.只能一个个传入参数：

// 这是引用的 apply.js 文件的内容
Function.prototype.myApply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    } else {
        // var args = [];
        // for (var i = 0, len = arr.length; i < len; i++) {
        //     // args.push('arr[' + i + ']');
        //     args.push(arr[+ i ]);
        // }
        // result = eval('context.fn(' + args + ')')
        result = eval('context.fn(' + arr + ')') // 直接调用或者用上面注释掉的方式调用，都可以
    }

    delete context.fn
    return result;
}


let arr = [1, 48, 2, 6, 9]

// let result = Math.max.myApply(null, arr) // 这样调用可以
let result = eval('Math.max('+ arr + ')') // 这样调用可以，但是下面这种方式就不行，感觉是 eval 在起作用。原因：eval函数在执行的时候会默认识别字符串里的数组元素，逐个传递参数 ，好比在 这里执行了es6的展开操作符…
let result = Math.max(arr) // 这种方式就不可以


console.log(result);