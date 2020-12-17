// 1. new 的手动实现

// 自己定义的 new 函数
function myNew(parent, ...param) {
    let obj = Object.create(parent.prototype) // 这一步是为了继承构造函数原型上的属性和方法
    let result = parent.call(obj, ...param) // 这一步使用构造函数返回的对象赋值给新建的对象，这样就能让新建的对象拥有构造函数上的属性。所以这就是为啥构造函数里给 this 赋值的变量实例也会有，而直接定义的变量实例里是没有的，因为，调用构造函数的对象是 obj 呀！！！！马鸭，知识点串起来了，开心
    return typeof result === 'object' ? result : obj // 判断构造函数是否有返回对象，因为虽然用 new 的方式新建一个实例会默认返回实例对象，但是如果不用 new 方法调用的构造函数就要看函数本身有没有显式返回对象
}

function Animal(name, type) {
    this.type = type
    this.name = name
}

let cat = myNew(Animal, 'cat1', 'catya')
console.log(cat.name);
console.log(cat.type);


class A {

}