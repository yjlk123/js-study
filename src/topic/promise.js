// // 1. promise 用法

// // （1）原始的回调函数方式
// function loadImg (src, callback, fail) {
//     let img = document.createElement('img')
//     img.onload = function () {
//         callback(img)
//     }
//     img.onerror = function () {
//         fail()
//     }
//     img.src = src
// }

// let src = 'http://abc.png'
// loadImg(src, function (img) {
//     console.log(img.width);
// }, function () {
//     console.log('load image failed!');
// })



// // （2）使用 promise 的方式
// // then 中有2个参数，第一个是状态变成成功后应该执行的回调函数，第二个参数是状态变成失败后应该执行的回调函数.注意是一个函数里的两个参数，
// // 失败时的函数是在第二个参数里，而不是在 .catch 里捕获的,这2个参数也不需要从 loadImg 传进去，直接就在 Promise 的构造函数的参数里，
// // 由最后调用这个 promise 的时候传进去实参, 也就是 Promise 的 then 方法里传入的函数，见下面 2.

// function loadImg (src) {
//     let promise = new Promise((resolve, reject) => {
//         let img = document.createElement('img')
//         img.onload = function () {
//             resolve(img)
//         }
//         img.onerror = function () {
//             reject('error')
//         }
//         img.src = src
//     })
//     return promise
// }

// 调用:
// loadImg.then(res => {

// })





// // 2.1 Promise 的用法2: 链式调用
// function fn () {
//     function p1 () {
//         return new Promise(function (resolve, reject) {
//             setTimeout(function () {
//                 resolve(1);
//             }, 1000);
//         });
//     }
//     function p2 (value) {
//         return new Promise(function (resolve, reject) {
//             setTimeout(function () {
//                 console.log('2')
//                 resolve(2 + value);
//             }, 3000);
//         });
//     }
//     p1().then(function (res) {
//         console.log(res); // 1000ms后输出1
//         return Promise.resolve(res); // 显式的return一个Promise对象
//     }).then(p2).then(function (res) {
//         console.log(res); // 再过3000ms后输出2,3
//     });
// }

// fn()


// // 2.2 Promise 的使用2
// // .then 还可以后面继续链式调用 .then 或 .catch, 要注意的是如果链式调用，前一个 .then 或 .catch 需要显示地返回一个 Promise 对象（注意：意思是 .then 的参数是个函数，是返回一个 promise 对象），
// // 否则会隐式地以  undefined 返回： return Promise.resolve(undefined), 那么后一个链式里获取到的就是 undefined 了.不过一般返回的都是 第一个 then 里
// // 用到的那个结果，也可以返回其他的东西，但都必须是 promise 对象

// let p = Promise.reject("error");
// p.catch(err => {
//     console.log("catch " + err); // catch error
//     // 这里会默认return Promise.resolve(undefined);
// }).then(res => {
//     console.log(res); // undefined
// });



// // 2.3 如果是传入一个 Promise 对象呢，直接返回，这个过程是语法糖，这题涉及到 Promise 的循环调用
// // // 直接调用 resolve:
// // Let p1 = Promise.resolve('abc')
// // // 等价于： 也就是 Promise.resolve() 是下面这个写法的语法糖：
// // let p2 = new Promise((resolve, reject) => {
// //   resolve('abc');
// // })

// let p = new Promise((resolve,reject) => {
//     setTimeout(() => {
//         resolve('success');
//     },500);
// });
// let pp = Promise.resolve(p);
// console.log(pp); // A 注意这里：因为 pp 依赖于进入宏任务队列的结果，所以主线程中虽然执行 pp 了，但是它的结果显示 Promise 处于 pending 状态。对比 B 处

// pp.then(result => {
//     console.log(result);
//     console.log(pp) // 对比 A
// });
// console.log(pp == p);



// 2.4.1 Promise 的错误捕获
// (1)异步代码的运行时错误无法被自动 reject 进而被 catch 捕获，而是直接报错 ?????????
let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      throw "error";
    }, 0);
  });
  
  p3.catch(err => {
    console.log("catch " + err); // 不会被执行
  });
  

// (2)但是若异步操作抛出错误的回调是在 Promise 的 catch 之前执行的，其实还是可以被 catch 所捕获到的，比如 Promise 的 then 方法所抛出的错误：
let p = Promise.resolve();
let p1 = new Promise(function (resolve, reject) {
  p.then(()=>{ 
    throw 123;
  }).catch(e => {
    reject(e);
  });
});

p1.catch(err => {
  console.log(err); // 123，错误成功被捕获
});





// // 3.接着看 eventloop-promise.js 这个文件，学习 promise 链式调用的事件循环






// 4.手动实现 promise
// 4.1 基本的功能
// 总结理解，如何记忆： Promise 的内部结构要从下往上理解，最终做的操作是执行传进去的异步函数 fn, 这个 fn 的参数就是 resolve 函数; 
// resolve 函数里做的操作是传进异步函数的结果来执行回调函数，不过这个回调函数是在 then 里面保存到本地变量了的， resolve 里还会保存异步操作的结果到本地变量.
// 可以这么说，其实主要承上启下的是 resolve 这个 Promise 的内部函数，往上延伸，往下扩展都围绕着它来就好记了。
// 关键点： 当异步函数回调成功后，会将结果作为参数来执行 resolve, 而实际上是执行 deferred 函数
function Promise (fn) {
    let value = null; // 异步函数执行后的结果
    let deferred; // 异步函数执行后，真正要执行的回调函数，保存到本地变量
    this.then = function (onFulfilled) { // Promise 的 then 方法用于注册回调函数，即赋值给内部的 deferred
        deferred = onFulfilled;
    }
    function resolve (newValue) { // 当异步函数回调成功后，会将结果作为参数来执行 resolve, 而实际上是执行 deferred 函数
        value = newValue;
        deferred(value);
    }
    fn(resolve); // 创建 Promise 实例的参数是 fn, 并将其内部的 resolve 方法作为参数传递给异步函数
}





// // 4.2 改进1
// // 目前的代码只能注册一个回调方法，这显然不符合我们的预期，所以将内部的deferred修改为deferreds数组，相应的执行resolve时，也要遍历deferreds数组依次执行：
// function Promise (fn) {
//     let value = null;
//     let deferreds = [];
//     this.then = function (onFulfilled) {
//         deferreds.push(onFulfilled);
//     }
//     function resolve (newValue) {
//         value = newValue;
//         deferreds.forEach((deferred) => {
//             deferred(value);
//         });
//     }
//     fn(resolve);
// }




// // 4.3 改进2
// // 实现 then 的链式调用，较简单
// this.then = function (onFulfilled) {
//     deferreds.push(onFulfilled);
//     return this; // 加了一句 return this，这样就可以链式调用了
// }