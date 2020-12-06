

// 1.手动实现 promise.all
// https://juejin.cn/post/6855129007852093453

Promise.myall = function (arr) {
    return new Promise((resolve, reject) => {
        if (arr.length === 0) {
            return resolve([])
        } else {
            let res = [],
                count = 0
            for (let i = 0; i < arr.length; i++) {
                // 同时也能处理arr数组中非Promise对象
                if (!(arr[i] instanceof Promise)) {
                    res[i] = arr[i]
                    if (++count === arr.length)
                        resolve(res)
                } else {
                    arr[i].then(data => {
                        res[i] = data
                        if (++count === arr.length)
                            resolve(res)
                    }, err => {
                        reject(err)
                    })
                }

            }
        }
    })
}

// 2.手动实现 promise.all 第二种书写方式，个人觉得第二种写得更简洁
// https://www.jianshu.com/p/c8af0c130ccb
function isPromise (obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

const myPromiseAll = (arr) => {
    let result = [];
    return new Promise((resolve, reject) => {
        for (let i = 0; i < arr.length; i++) {
            if (isPromise(arr[i])) {
                arr[i].then((data) => {
                    result[i] = data;
                    if (result.length === arr.length) {
                        resolve(result)
                    }
                }, reject) // 如果失败，直接用 new 的这个 Promise 的 reject 函数作为错误处理函数，因为它本身就是个函数
            } else {
                result[i] = arr[i];
            }
        }
    })
}