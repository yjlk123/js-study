// Promise 链式调用的一些思考 https://www.jianshu.com/p/aa3d8b3adde3


new Promise((resolve, reject) => {
  console.log("外部promise"); // a
  resolve();
})
  .then(() => { // b     then 方法返回的是一个新的 Promise, 不是原来那个，所以可以使用链式调用（这是定义，https://es6.ruanyifeng.com/#docs/promise#Promise-resolve）
    console.log("外部第一个then");
    new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve(); // 这里 resolve 之后，立马将 c 放进微任务队列，并且由于这个 Promise resolved 了，所以第一个 then 就是 resolved 了，也会把 e 放进微任务队列里了。
                 // 为啥不在放 c 后立马放 d，而是放 e 呢？因为放进 c 时，还没运行 c, c 所默认返回的 Promise 就还没被 resolved, 所以 d 不会被放进微任务队列里 
    })
      .then(() => { // c
        console.log("内部第一个then");
      })
      .then(() => { // d
        console.log("内部第二个then");
      });
  })
  .then(() => { // e
    console.log("外部第二个then");
  });

  // 外部promise, 外部第一个then, 内部promise, 内部第一个then
  
// 主线程：
// 微任务： e d
// 宏任务：











// log: 外部promise
// log: 外部第一个then
// log: 内部promise
// log: 内部第一个then
// log: 外部第二个then
// log: 内部第二个then