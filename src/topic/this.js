

// // 1.默认绑定
// function fn1() {
//     let fn2 = function () {
//         console.log(this) //window
//         fn3()
//     }
//     console.log(this) //window
//     fn2()
// }

// function fn3() {
//     console.log(this) //window
// }



// 2.
function fn5() {
    var obj = {
        id: 'awesome',
        cool: function coolFn() {
            console.log(this.id)
        },
    }
    var id = 'not awesome'
    obj.cool() // awesome
    debugger
    setTimeout(obj.cool, 5000) // not awesome  ?为啥这里是这个结果?
}


// // 3.
// function fn() {
//     console.log(this); // window
//     console.log(this.name); // 听风是风
// };

// function fn1() {
//     "use strict";
//     console.log(this); // undefined
//     console.log(this.name); // 报错: Uncaught TypeError: Cannot read property 'name' of undefined
// };

// var name = '听风是风';

// // 5.
// "use strict";
// var name = '听风是风';
// function fn() {
//     console.log(this); //undefined
//     console.log(this.name);//报错
// };


// // 6.隐式绑定
// function fn() {
//     console.log(this.name);
// };
// let obj = {
//     func: fn,
// };
// let obj1 = {
//     name: '听风是风',
//     o: obj
// };
// // obj1.o.func() // undefined

// 7.隐式丢失，然后又重新被赋值了   注意对比 6
var name = '行星飞行';
let obj = {
    name: '听风是风',
    fn: function () {
        console.log(this.name);
    }
};
let obj1 = {
    name: '时间跳跃'
}
obj1.fn = obj.fn;
// obj1.fn(); // 时间跳跃




// 7.明明用 call 绑定了 this,但运行时还是 window, 太坑了吧，这到底咋理解啊，要暴走了！

function f9(){
    console.log('f9')
    console.log(this)
    var arr = [1,2,3]
    arr.map(function (item) {
        console.log(this); // 居然还是 window !!!
    })
}
f9.call({a: 1})

