// bind 和 this 息息相关


// // 1.bind
// const obj = {}
// function test(){
//     console.log(this === obj)
// }
// const testObj = test.bind(obj)

// test() // false 注意: bind 是生成一个全新的函数，原来的函数不受影响
// testObj() // true




// 2.手动实现一个 bind

const obj = {}
function test(){
    console.log(this === obj)
}

// 自定义的函数，模拟 bind 对 this 的影响；
// 注意区别，自己写的方法是将对象和目标都作为参数了，而原生的 bind 是作为了一个函数的属性方法存在的
function myBind(func, target){
    return function(){ // 一个闭包
        return func.apply(target, arguments) // arguments ? 哪来的？
    }
}

const testObj = myBind(test, obj)
test()
testObj()




// 3.如果函数绑定了 bind ,再绑定 call 和 apply , 则不会再被改变 this, 这个叫做硬绑定
const obj = {}
function test(){
    console.log(this === obj);
}
// 绑到其他对象上，而不是 obj 上
const testObj = test.bind({})
test.apply(obj) // true
// 期望 this 是 obj, 但是因为已经被 bind 绑定到其他对象了，所以会输出 false.不过如果一开始是用的 call 和 apply，那么还是可以被改变成新的指向，这是 bind 和 它们2个的区别
testObj.apply(obj) // fasle



