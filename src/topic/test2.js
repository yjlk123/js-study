// 本文件用于测试

// // 1.getName
// function Foo () {
//     this.getName = function () { console.log('1') };
//     return this;
// }
// Foo.getName = function () { console.log('2'); };
// Foo.prototype.getName = function () { console.log('3'); };
// var getName = function () { console.log('4') };
// function getName () { console.log('5'); };

// //打印
// getName();
// Foo.getName();
// getName();
// Foo().getName(); // 如果不 return, 则会报错
// getName(); // 上一步在全局添加了一个 getName 方法
// new (Foo.getName)();
// (new Foo()).getName(); // 注意区分 new Foo() 和 Foo() 之间的区别


// 2.getName

function Foo () {
    getName = function () {
        console.log(1);
    };
    console.log('this is' + this)
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log('baidu' && 'google');
};
var getName = function () {
    console.log(4);
};
function getName () {
    console.log(5);
}

Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
console.log('baidu' && 'google'); // 'google'

// 2, 4, this is window 1, 1, 2, this is object google, this is object google 


// 3.
// function Foo () {
//     getName = function () {
//         console.log(1);
//     };
//     console.log('this is' + this)
//     return this;
// }
// Foo()
// getName()

// 4.new
function myNew (fn) {
    let obj = Object.create(fn.prototype)
    let args = Array.prototype.slice(arguments, 1)
    let result = fn.apply(obj, args)
    return typeof result === 'object' ? result : obj
}

// 5.去重
function deWeight () {
    let result = arr.filter((item, index, arr) => {
        return arr.indexOf(item) === index
    })
    return result
}
function deWeight2 () {
    let result = arr.reduce((pre, cur, index, arr) => {
        return pre.includes(cur) ? pre : [...pre, cur]
    }, [])
    return result
}

// 6.flat
// 6.1
function flat (arr) {
    let result = arr.reduce((pre, cur, index, arr) => {
        return cur instanceof Array ? [...pre, ...flat(cur)] : [...pre, cur]  // 易错点： flat(cur) 前面要加扩展符， 这个老是容易忘
    }, [])
    return result
}

// 6.2
function flat2 (arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Array) {
            result = result.concat(flat2(arr[i])) // 注意 concat 不会改变原数组，必须要记得赋值给 result
        } else {
            result.push(arr[i])
        }
    }
    return result
}

// 6.3 带层级的 flat, dep 指定要迭代几次，也就是指定要 flat 几次
function flat3 (arr, dep) {
    // return dep > 0 ? arr.reduce((pre, cur) => {
    //     return cur instanceof Array ? [...pre, ...flat(cur, dep - 1)] : [...pre, cur]
    // }, []) : arr.slice()
    return dep > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flat3(val, dep - 1) : val),
    []) : arr.slice(); // 注意注释掉的部分是错误写法， 因为要指定层级，这时就不能使用扩展符都展开了
}
let arr = [1, 2, 3, [4, 5, 6, [8, [9, 10]]], 7]
let a = flat3(arr, 2) // [1, 2, 3, 4, 5, 6, 8, [9, 10] , 7]
console.log(a);


// 7.深拷贝
function cloneDeep(){
    if(typeof obj !== 'object')
    return // 这里直接返回就行，因为在下面有判断并赋值
    let objResult = obj instanceof Array ? [] : {}
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            objResult[key] = typeof obj[key] !== 'object' ? obj[key] : cloneDeep(obj[key])
        }
    }
    return objResult
}


// 8. 判断一个对象的类型
function typeJudge(obj, type){
    return Object.prototype.toString.call(obj) === `[object ${type}]` // 注意是：Object.prototype.toString， 其中有 prototype 的, 还有注意传参，只传一个就行，不需要第二个参数
}
let obj1 = {a: 1}
console.log(typeJudge(obj1, 'Object'))


// 9.bind
Function.prototype.myBind = function(obj){
    let arg = []
    let fn = this
    arg = Array.prototype.slice.call(arguments, 1) // 注意别忘了 apply
    return function () {
        let params = arg.concat(Array.prototype.slice.apply(arguments)) // 注意别忘了 apply    // arg.concat(Array.prototype.slice.apply(arguments)) 和 arg.concat.apply(Array.prototype.slice.apply(arguments)) 居然加不加 apply 都一样！！！！！？？？？？？
        fn.apply(obj, params) // 注意 fn, 和 obj 的位置要搞清楚，this 是保存了 fn, 而不是 obj
    }
}
let bindObj1 = {
    name: '1'
}

function use(){
    console.log(this.name);
}
let ab = use.myBind(bindObj1)
ab()