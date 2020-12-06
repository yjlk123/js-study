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





// 2. Promise 的用法2: 链式调用
function fn () {
    function p1 () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(1);
            }, 1000);
        });
    }
    function p2 (value) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log('2')
                resolve(2 + value);
            }, 3000);
        });
    }
    p1().then(function (res) {
        console.log(res); // 1000ms后输出1
        return Promise.resolve(res); // 显式的return一个Promise对象
    }).then(p2).then(function (res) {
        console.log(res); // 再过3000ms后输出2,3
    });
}

fn()


// 3.接着看 eventloop-promise.js 这个文件，学习 promise 链式调用的事件循环


// 4.手动实现 promise
// 4.1 基本的功能
function Promise(fn) {
    let value = null; // 异步函数执行后的结果
    let deferred; // 异步函数执行后，真正要执行的回调函数
    this.then = function(onFulfilled) {
      deferred = onFulfilled;
    }
    function resolve(newValue) {
      value = newValue;
      deferred(value);
    }
    fn(resolve);
  }
