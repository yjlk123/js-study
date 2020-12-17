// 函数防抖
// 在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时
// 核心思想：每次事件触发都会删除原有定时器，建立新的定时器。通俗意思就是反复触发函数，只认最后一次，从最后一次开始计时。

// 1.防抖函数的实现
function debounce (fn, delay) {
    let timer = null;
    return function (...args) { // A 这种一般都是会返回一个函数，真正要执行的函数通过 参数传进去. 防抖和节流都是
        let context = this
        console.log(...args);
        console.log('2');
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            console.log('3');
            fn.apply(context, args)
        }, delay)
    }
}

function fn(arg){
    console.log('fn');
}
// 这种调用方式，是达不到防抖目的的，因为会立即执行函数。不过有个知识点：这样调用居然是先进的 fn, 再进 debounce 函数
// 注意 防抖函数的调用方式，应该是用柯里化，这里这样达不到目的的，不过调用方式倒是对的
// debounce(fn(1), 2000)()

// 注意看打印出的数据顺序.  A 部分是同步的，所以不会在定时之后走程序
debounce(fn, 2000)(4)




