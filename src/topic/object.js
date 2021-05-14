// 拓展，关于赋值引用的问题
let obj1 = {
  a: 1
}

let obj2 = {
  a: 2
}

obj2 = obj1 // obj2 的指针指向 obj1, 修改 obj2 其实就是修改 obj1.这就是引用赋值最常见的问题

obj2.a = 3

console.log(obj1);