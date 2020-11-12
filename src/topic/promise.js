// // 1. promise 用法

// function loadImg(src){
//     let img = document.createElement('img')
//     let promise = new Promise((resolve, reject) => {
//         img.onsuccess = function(){
//             resolve(img)
//         } 
//         img.onsuccess = function(){
//             reject('error')
//         }
//         img.src = src
//     })
//     return promise
// }

// 2
function fn() {
    function p1() {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(1);
            }, 1000);
        });
    }
    function p2(value) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log('2')
                resolve(2 + value);
            }, 1000);
        });
    }
    p1().then(function (res) {
        console.log(res); // 1000ms后输出1
        return Promise.resolve(res); // 显式的return一个Promise对象
    }).then(p2).then(function (res) {
        console.log(res); // 再过1000ms后输出3
    });
}
