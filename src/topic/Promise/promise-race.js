// // // 1.promise.race 的用法  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 5000, 'one'); // 这里，可以直接将 resolve 函数传递给 setTimeout, 因为 resolve 本身就是个函数
// });

// const promise2 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 1000, 'two');
// });

// Promise.race([promise1, promise2]).then((value) => {
//     console.log(value);
//     // Both resolve, but promise2 is faster
// });
// // expected output: "two"



// 2.promise.race 的异步性
// promise.race 是否异步，取决于传入的参数
// we are passing as argument an array of promises that are already resolved,
// to trigger Promise.race as soon as possible
var resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

var p = Promise.race(resolvedPromisesArray);
// immediately logging the value of p
console.log(p);

// using setTimeout we can execute code after the stack is empty
setTimeout(function () {
    console.log('the stack is now empty');
    console.log(p);
}, 3000);

// logs, in order:
// Promise { <state>: "pending" }
// the stack is now empty
// Promise { <state>: "fulfilled", <value>: 33 }




// 3.手动实现 promise.race
// https://juejin.cn/post/6855129007852093453

Promise.myrace = function (arr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < arr.length; i++) {
            // 同时也能处理arr数组中非Promise对象
            if (!(arr[i] instanceof Promise)) {
                Promise.resolve(arr[i]).then(resolve, reject) // 不是 Promise 的通过 Promise.resolve 将它变成 Promise 对象，然后就可以用 then 了
            } else {
                arr[i].then(resolve, reject)
            }

        }
    })
}