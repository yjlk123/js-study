// 是关于 promise 的 eventloop, 结合这2个文件看



// 知识点：
// 1.promise 的 new 操作和 then 的执行都是同步操作，但是 then 里的回调函数是异步的。关于啥时候将回调推入微任务队列是有讲究的：
// (1)当执行 then 方法时，如果前面的 promise 已经是 resolved 状态，则会立即将回调推入微任务队列（但是执行回调还是要等到所有同步任务都结束后）, 如果前面的 promise 是 pending 状态则会将回调存储在 promise 的内部，一直等到 promise 被 resolve 才将回调推入微任务队列
// (2)当一个 promise 被 resolve 时，会遍历之前通过 then 给这个 promise 注册的所有回调，将它们依次放入微任务队列中
// 2.resolve 的作用除了将当前的 promise 由 pending 变为 resolved，还会遍历之前通过 then 给这个 promise 注册的所有回调，将它们依次放入微任务队列中，很多人以为是由 then 方法来触发它保存回调，而事实上是由 promise 的 resolve 来触发的，then 方法只负责注册回调


// // 1.promise 的链式调用的 eventloop (1)
// // https://www.jianshu.com/p/aa3d8b3adde3 讲得很好，简单易懂
// function p1 () {
//     return new Promise((resolve, reject) => {
//         console.log("log: 外部promise");
//         resolve();
//     })
//         .then(() => {
//             console.log("log: 外部第一个then");
//             new Promise((resolve, reject) => {
//                 console.log("log: 内部promise");
//                 resolve();
//             })
//                 .then(() => {
//                     console.log("log: 内部第一个then");
//                 })
//                 .then(() => {
//                     console.log("log: 内部第二个then");
//                 });
//         })
//         .then(() => {
//             console.log("log: 外部第二个then");
//         });
// }
// p1()



// // 2. 链式调用的 eventloop (2)
// // https://juejin.cn/post/6844903638238756878

// console.log('script start');

// setTimeout(function () {
//     console.log('setTimeout');
// }, 0);

// Promise.resolve().then(function () {
//     console.log('promise1');
// }).then(function () {
//     console.log('promise2');
// });

// console.log('script end');




// // 3.链式调用的 eventloop (3) 和 1,2 做对比
// // https://www.jianshu.com/p/aa3d8b3adde3

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
//         console.log(res);
//         return Promise.resolve(res); // 显式的return一个Promise对象
//     }).then(p2).then(function (res) {
//         console.log(res);
//     });

// 4.接着看 eventloop.js 这个文件，对前面的知识进行练习





// // 5.练习例子
// let p1 = new Promise((resolve, reject) => {
//     setTimeout(function() {
//       resolve(1);
//     }, 1000);
//   });
//   function p2(value) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(2 + value);
//       }, 1000);
//     });
//   }
//   p1.then(res => {
//     console.log(res);
//   }).then(p2).then(res => {
//     console.log(res);
//   });
  

