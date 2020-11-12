// 函数柯里化

// 柯里化的特性：1. 参数复用， 2.提前返回 3.延迟调用
// 柯里化的公式差不多是：
// 1.一个函数 curryFn（它的参数是个函数 fn）里返回一个匿名函数，这个匿名函数里返回的是 fn.apply(this, args)，其中参数有很多知识点，可以保存之前的函数，合并到这里一块调用； 
// 2.然后调用这个 curryFn 函数,赋值给一个变量 progressCurry。 调用的第一个参数是一个函数，就是 1 中的 fn，这个函数就是最终想要调用的函数，神奇的地方就在于，通过 curryFn 的运作，能在这个 fn 里获取到所有的参数，包括之前调用的参数； 第二个参数就根据要使用哪一种特性来决定要不要传递
// 3.使用时调用 progressCurry 这个变量，传递参数，多个参数，也可以多个括号里传参




// 1.柯里化的基本特性1：复用参数
var currying = function(fn) {
    // fn 指官员消化老婆的手段
    var args = [].slice.call(arguments, 1); // A
    // args 指的是那个合法老婆
    return function() {
        // 已经有的老婆和新搞定的老婆们合成一体，方便控制
        var newArgs = args.concat([].slice.call(arguments)); // B 注意： A 和 B 的 arguments 是不一样的，并不是同一个
        // 这些老婆们用 fn 这个手段消化利用，完成韦小宝前辈的壮举并返回
        return fn.apply(null, newArgs);
    };
};

// 下为官员如何搞定7个老婆的测试
// 获得合法老婆
var getWife = currying(function() {
    var allWife = [].slice.call(arguments);
    // allwife 就是所有的老婆的，包括暗渡陈仓进来的老婆
    console.log(allWife.join(";"));
}, "合法老婆");

// 获得其他6个老婆
getWife("大老婆","小老婆","俏老婆","刁蛮老婆","乖老婆","送上门老婆");

// 换一批老婆
getWife("超越韦小宝的老婆");




// 2.柯里化的特性2：提前返回
// 2.1 兼容浏览器事件绑定的一般写法：
var addEvent = function(el, type, fn, capture) {
    if (window.addEventListener) {
        el.addEventListener(type, function(e) {
            fn.call(el, e);
        }, capture);
    } else if (window.attachEvent) {
        el.attachEvent("on" + type, function(e) {
            fn.call(el, e);
        });
    }
};

// 2.2 柯里化写法：
var addEvent = (function(){
    if (window.addEventListener) {
        return function(el, sType, fn, capture) {
            el.addEventListener(sType, function(e) {
                fn.call(el, e);
            }, (capture));
        };
    } else if (window.attachEvent) {
        return function(el, sType, fn, capture) {
            el.attachEvent("on" + sType, function(e) {
                fn.call(el, e);
            });
        };
    }
})(); // 注意这里的立即调用





// 3.柯里化的特性3：延迟计算
// https://www.zhangxinxu.com/wordpress/2013/02/js-currying/

var curryWeight = function(fn) {
    var _fishWeight = [];
    return function() { // 每次调用 addWeight 这个变量，实际上执行的是这个函数，即 arguments 是调用 addWeight 这个变量时的参数
        if (arguments.length === 0) {
            return fn.apply(null, _fishWeight); // A
        } else {
            // 拓展：注意这里为啥要使用 [].slice.call 的方式来调用这个 slice 函数，因为 arguments 是类数组对象，不是真的数组，所以要这样调用
            _fishWeight = _fishWeight.concat([].slice.call(arguments)); // B  
        }
    }
};
var fishWeight = 0;
var addWeight = curryWeight(function() {
    var i=0; len = arguments.length; // 注意这里 arguments 是在调用这个函数时才确定的，就是在 A 这里才确定了，因为 arguments 就是指的实参
    for (i; i<len; i+=1) {
        fishWeight += arguments[i];
    }
});

addWeight(2.3);
addWeight(6.5);
addWeight(1.2);
addWeight(2.5);
addWeight();    //  这里才计算， 原因就是因为闭包，所以 B 处可以记录上一次的数据，拿到含有上次数据的 _fishWeight 变量

console.log(fishWeight);    // 12.5






//5. 支持多参数传递 todo 有问题, 这段代码大概看一下就行
function progressCurrying(fn, args){
    let _this = this
    let len = fn.length
    let args = args || []

    return function(){
        let _args = Array.prototype.slice.call(arguments)
        Array.prototype.push.apply(args, _args)

        if(_args.length < len){
            return progressCurrying(_this, fn, _args)
        }
        return fn.apply(this, _args)
    }
}

progressCurrying(function(a){
    console.log(a)
})



// 6. 用柯里化实现的 bind
function curryFn(){
    let fn = [].slice.apply(arguments, 0)
    return function(context){
        return fn.apply(context, [].slice.apply(arguments, 2))
    }
}

let obj = {
    name: '123'
}

let myBind = curryFn(function(){
    console.log(this.name)
})

myBind(obj)

