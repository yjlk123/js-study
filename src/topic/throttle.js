// 函数节流
// 意思是有节制地执行，而不是毫无节制地触发一次就执行一次，即一段时间内，只执行一次
// 抓取一个关键的点：就是执行的时机。要做到控制执行的时机，我们可以通过「一个开关」，与定时器setTimeout结合完成

// 1.节流函数的实现
function throttle(fn, delay){
    let flag = true, timer = null;
    return function(...args){ // 这种一般都是会返回一个函数，真正要执行的函数通过 参数传进去
        let context = this // 注意这里
        if(!flag){
            return
        }
        flag = false
        clearTimeout(timer) // 需要先清除再定义定时器，因为上一次的还存在
        timer = setTimeout(() => { // 感悟：自从理解了浏览器事件循环的原理，遇到这样的情况就知道是怎么处理的，以及一部分这么做的原因了
            fn.apply(context, args)
            flag = true
        }, delay)
    }
}