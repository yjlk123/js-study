

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