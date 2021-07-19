// 实现 sleep 函数

// 参考链接： https://juejin.cn/post/6855129007852093453#heading-13  链接里的写法其实有点问题，因为是传进去执行结果，并不会有 sleep 的效果
// 1.sleep 函数的特性2个： 阻塞后面的代码；一定时间的暂停。符合这2个功能的函数就是 async/await
function mySleep(fn, time){
    return new Promise(function(resolve, reject) {
        setTimeout(()=> {
            resolve(fn()) // 记得 resolve
        }, time)
    })
}
let doSth = function (){
    console.log('222');
}
async function sleep (fn, time){
    let waitResult = await mySleep(fn, time)
}

console.log('111');
sleep(doSth, 1000)
console.log('333'); // 333 会在 222 之前运行，所以这个 sleep 函数的意思是让传进去的函数一段时间后执行
