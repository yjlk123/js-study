

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
                    res[i] = arr[i] // 这里说明 Promise.all 是按传入数组的顺序将结果返回的
                    if (++count === arr.length) // 如果是用这个来做判断条件的话: result.length === arr.length 这样写有个错误的问题，如果最后一项不是最后一个完成的，那么就有空的项
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

function isPromise (obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}