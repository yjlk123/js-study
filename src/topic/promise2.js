// promise 的用法
// 1.promise 内部的错误无法通过 try catch 来捕获，称为静默 ???这里有个问题，为啥试了一下，可以啊，猜想是 es6 的原因？
try {
    let p = new Promise((resolve, reject) => {
        throw new Error("I'm error");
        // reject(new Error("I'm Error"));
    });
}catch(e) {
    console.log('catch',e);
}


