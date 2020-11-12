// 函数声明，函数提升相关

// // 1.函数声明的2种方式
// // 函数表达式
// var f = function() {
//     console.log(1);  
// }

// // 直接声明
// function f (){
//    console.log(2);
// }

// f()


// // 2.函数声明提升的覆盖关系 答：后面的会覆盖前面的
// // 直接声明1
// function f (){
//     console.log(2);
//  }
//  f()
 
//  // 直接声明2
//  function f (){
//     console.log(3);
//  }
 


// // 3.1变量提升的覆盖关系1
// var a = 1
// var a
// console.log(a);

// // 3.2变量提升的覆盖关系2
// var a = 1
// var a = 2
// console.log(a);


// 4.函数和变量的提升对比

// function test(){
// alert(4);
// }
var test

console.log(test);
var test = 2
console.log(test);
