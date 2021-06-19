// 变量提升，函数提升

// // 1.函数提升优先级高于变量提升
// var test
// function test(){
//     alert(4);
//   }
// console.log(test);

// 2. 同一个变量声明会忽略后面的声明，只有赋值会覆盖。函数的重复声明会取最后一个
var test
function test(){
    alert(4);
  }
console.log(test);
function test(){
    alert(5);
  }
console.log(test);
test = '123'
console.log(test);

// 3.练习
console.log(person)
console.log(fun)
var person = 'jack'
console.log(person)
 
function fun () {
    console.log(person)
    var person = 'tom'
    console.log(person)
}
fun()
console.log(person)

