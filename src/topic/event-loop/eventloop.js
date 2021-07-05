// // 1
// function fn () {
//     Promise.resolve().then(() => {
//         console.log('Promise1')
//         setTimeout(() => {
//             console.log('setTimeout2')
//         }, 0)
//     })

//     setTimeout(() => {
//         console.log('setTimeout1')
//         Promise.resolve().then(() => {
//             console.log('Promise2')
//         })
//     }, 0)
// }

// fn()


// 2. https://juejin.cn/post/6844903638238756878
console.log('1');

setTimeout(function() { // a
    console.log('2');
    process.nextTick(function() { // b
        console.log('3');
    })
    new Promise(function(resolve) { // c
        console.log('4');
        resolve();
    }).then(function() { // d
        console.log('5')
    })
})
process.nextTick(function() { // e
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {  // f
    console.log('8')
})

setTimeout(function() { // g
    console.log('9');
    process.nextTick(function() { // h
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() { // i
        console.log('12')
    })
})