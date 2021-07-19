// async/await 是以同步方式来调用异步函数

function fn1 () {
    return new Promise(resolve => {
        setTimeout(function () {
            msg = 'wait me 3000';
            resolve(msg)
        }, 3000);
    });
}
async function asyncCall () {
    var result = await fn1();
    console.log(result);
    console.log('haha');
}
console.log('先运行，async 不会阻塞后面的代码，await 会阻塞，所以叫同步方式实现异步');
asyncCall();
console.log('async 不会阻塞后面的代码');
