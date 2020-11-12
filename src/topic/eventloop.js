// 1
function fn() {
    Promise.resolve().then(() => {
        console.log('Promise1')
        setTimeout(() => {
            console.log('setTimeout2')
        }, 0)
    })

    setTimeout(() => {
        console.log('setTimeout1')
        Promise.resolve().then(() => {
            console.log('Promise2')
        })
    }, 0)
}




// 2
function fn() {
    console.log('1');

    setTimeout(function () { // a
        console.log('2');
        process.nextTick(function () {
            console.log('3');
        })
        new Promise(function (resolve) {
            console.log('4');
            resolve();
        }).then(function () {
            console.log('5')
        })
    })
    process.nextTick(function () {
        console.log('6');
    })
    new Promise(function (resolve) {
        console.log('7');
        resolve();
    }).then(function () {
        console.log('8')
    })

    setTimeout(function () { // b
        console.log('9');
        process.nextTick(function () {
            console.log('10');
        })
        new Promise(function (resolve) {
            console.log('11');
            resolve();
        }).then(function () {
            console.log('12')
        })
    })
} // 1，7，6，8，2，4，3，5，9，11，10，12