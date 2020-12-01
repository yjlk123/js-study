// // 1.promise.race 的用法  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 500, 'one');
// });

// const promise2 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 100, 'two');
// });

// Promise.race([promise1, promise2]).then((value) => {
//     console.log(value);
//     // Both resolve, but promise2 is faster
// });
//   // expected output: "two"
