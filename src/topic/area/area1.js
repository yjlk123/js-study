// 作用域相关，立即执行函数
var a = 2; // 如果没有分号会报错

(function IIFE (def) {
    console.log('iife this', this);
    def(window);
})(function def (global) {
    var a = 3;
    console.log(a); // 3 
    console.log( global.a ); // 2
    console.log('def this',this);
})