// Promise.resolve().then(()=>{ // d
//   console.log('Promise1')  
//   setTimeout(()=>{ // a
//     console.log('setTimeout2')
//   },0)
// })

// setTimeout(()=>{ // b
//   console.log('setTimeout1')
//   Promise.resolve().then(()=>{ // c
//     console.log('Promise2')    
//   })
// },0)

// // Promise1， setTimeout1, Promise2, setTimeout2




// console.log('1');

// setTimeout(function () { // a
//   console.log('2');
//   process.nextTick(function () { // b
//     console.log('3');
//   })
//   new Promise(function (resolve) { // c
//     console.log('4');
//     resolve();
//   }).then(function () { // d
//     console.log('5')
//   })
// })

// process.nextTick(function () { // e
//   console.log('6');
// })

// new Promise(function (resolve) { // f
//   console.log('7');
//   resolve();
// }).then(function () { // g
//   console.log('8')
// })

// setTimeout(function () { // h
//   console.log('9');
//   process.nextTick(function () { // i
//     console.log('10');
//   })
//   new Promise(function (resolve) { // j
//     console.log('11');
//     resolve();
//   }).then(function () { // k
//     console.log('12')
//   })
// })

// // 1, 7, 8, 2, 4, 5, 6, 9, 11, 12, 3, 10

// // 1,7,6,8,2,4,3,5,9,11,10,12



// https://www.jianshu.com/p/aa3d8b3adde3
new Promise((resolve, reject) => {
  console.log("log: 外部promise");
  resolve();
})
  .then(() => { // a
    console.log("log: 外部第一个then");
    new Promise((resolve, reject) => { // b
      console.log("log: 内部promise");
      resolve();
    })
      .then(() => { // c
        console.log("log: 内部第一个then");
      })
      .then(() => { // d
        console.log("log: 内部第二个then");
      });
  })
  .then(() => { // e
    console.log("log: 外部第二个then");
  });
  // 外部promise, 外部第一个then, 内部promise, 内部第一个then, 外部第二个then, 内部第二个then

// 主：
// 微：
// 宏： 