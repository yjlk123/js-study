// 执行上下文
// https://www.cnblogs.com/echolun/p/11438363.html


// // 1.变量的声明重复的会忽略，赋值会覆盖；函数的声明重复的后者覆盖前者，赋值也会覆盖；函数和变量的声明同名的话，是函数优先级更高
// var a1 = 1
// console.log(a1);
// console.log(a2);
// var a2 // 条件切换： 把本行注释掉会报错，可知，声明提升是在所有的代码运行之前先走了一遍
// var a1 = 2
// console.log(a1);
// function f1() {
//     console.log('听风是风');
// };
// f1(); //echo

// function f1() {
//     console.log('echo');
// };
// f1(); //echo


// // 2.函数的变量提升
// var f2 = function () {
//     console.log('听风是风');
// };
// f2(); //听风是风

// var f2 = function() {
//     console.log('echo');
// };
// f2(); //echo


// 3. 调用栈
// 代码执行前JS引擎会做准备创建执行上下文
function f1() {
    f2();
    console.log(1);
};

function f2() {
    f3();
    console.log(2);
};

function f3() {
    console.log(3);
};

f1();

