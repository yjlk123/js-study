// 下列代码执行顺序

async function async1() { // A
  console.log('async1 start');
  await async2();
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

// 微任务 
// 宏任务 C F E

// script start, async1 start, async2, promise1, script end, setTimeout, async1 end, promise2