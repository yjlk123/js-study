// 变量提升，函数提升

// // 1.函数提升优先级高于变量提升
// var test
// function test(){
//     alert(4);
//   }
// console.log(test);

// 2. 同一个变量声明会忽略后面的声明，只有赋值会覆盖
var test
function test(){
    alert(4);
  }
console.log(test);
test = '123'
console.log(test);
