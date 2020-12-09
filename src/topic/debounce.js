// 函数防抖
// 在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时
// 核心思想：每次事件触发都会删除原有定时器，建立新的定时器。通俗意思就是反复触发函数，只认最后一次，从最后一次开始计时。

// 1.防抖函数的实现
function debounce (fn, delay) {
    let timer = null;
    return function (...args) { // 这种一般都是会返回一个函数，真正要执行的函数通过 参数传进去. 防抖和节流都是
        let context = this
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay)
    }
}