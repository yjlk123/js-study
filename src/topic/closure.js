// 闭包


// 1.1正确闭包
function fn1(){
    for (var i = 0; i < 5; i++) {
        (function(i) {
          setTimeout(function() {
            console.log(i);
          }, i * 1000);
        })(i);
      }
}

// 1.2 使用 let 代替 var 形成块级作用域
// https://juejin.cn/post/6854573211443544078#heading-35


// 2.删除了对 i 的引用
function fn2(){
    for (var i = 0; i < 5; i++) {
        (function() {
          setTimeout(function() {
            console.log(i);
          }, i * 1000);
        })(i);
      }
}

// 3.给 setTimeout 传入一个立即执行函数 ??
function fn3(){
  for (var i = 0; i < 5; i++) {
    setTimeout((function(i) {
      console.log(i);
    })(i), i * 1000);
  }
}

fn3()
