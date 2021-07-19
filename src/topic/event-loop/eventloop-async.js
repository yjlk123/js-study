// 应该先看 一般的事件循环，再看 Promise 链式调用的事件循环，再看这个文件
// 下列代码执行顺序

async function async1() { // A
  console.log('async1 start');
  await async2(); // await 会阻塞它后面的代码，相当于 Promise 的 then 里的回调，但是 async 不会阻塞后面的其他语句
  console.log('async1 end'); // F
}

async function async2() { // B
  console.log('async2');
}

console.log('script start');

setTimeout(function() { // C
  console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) { // D
  console.log('promise1');
  resolve();
}).then(function() { // E
  console.log('promise2');
});

console.log('script end');

// script start, async1 start, async2, promise1, script end, async1 end, promise2, setTimeout

// 主线程 
// 注册：
// 微任务 
// 宏任务

