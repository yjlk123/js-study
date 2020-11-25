// 验证一些内置的对象的方法

// 1.hasOwnProperty

function A () {
    this.name = 'name'
    let id = 'id'
}

let a = new A()

console.log(a.hasOwnProperty('id')); // false
console.log(a.hasOwnProperty('name')); // true