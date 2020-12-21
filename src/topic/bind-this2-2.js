// 接 bind-this2-1, 以下内容是对该链接的记录，讲得超级好，层层递进：https://www.cnblogs.com/echolun/p/12178655.html
// 关于 this 绑定的优先级：https://www.cnblogs.com/billyu/p/10063823.html


// 总结：
// bind 的4个特性：
// 1.可以修改函数 this 的指向, 返回一个绑定了 this 的新函数
// 2.支持函数柯里化
// 3.this 无法再次被修改，使用 call 、 apply 也不行
// 4.其中要注意用 new 方式调用函数这种方式，会忽略已经确定的 this,但返回的实例还是会继承构造函数的构造器属性与原型属性，并且能正常接收参数。但如果是用普通调用的
// 方式进行调用的话，又能正确绑定到 this， 所以会感觉有点混乱




// 1.版本一：能够返回一个绑定了 this 的新函数

Function.prototype.bind_ = function (obj) {
    var fn = this; // 这里的 this, 其实就是 fn ,因为调用 bind_ 这个函数时，是 fn 调用的， 因为 this 的定义就是指向调用它的那个人，所以这时候 this 是 fn, 就是将 fn 保存下来了。如果不提前保存，在执行bound时内部this会指向window。
    return function () {
        fn.apply(obj);
    };
};

var obj = {
    z: 1
};

function fn() {
    console.log(this.z);
};

var bound = fn.bind_(obj);
bound(); //1





// 2.版本二：支持柯里化

Function.prototype.bind_ = function (obj) {
    var fn = this;
    let args = [].slice.apply(arguments, 1) // 注意这里用的是 call, 而不是 apply, 是因为 arguments 是类数组，不是真正的数组吗？但问题在于 call 不是要一个个参数调用吗？这样不是一个个参数的形式啊???
                                                // 答：问这个问题是因为对 apply 和 call 的用法不熟悉的原因，用法：Function.apply(obj,args)， 第一个参数根本就
                                                // 不是参数，当然不涉及数组还是单个参数的问题，第一个参数是为了绑定 this 值的啊，这都忘了，服了！所以我猜用 call 还是 apply 都一样的，因为只有一个参数 1， 所以直接用 call 更方便呀

    return function () {
        let params = [].slice.apply(arguments)
        fn.apply(obj, args.concat.apply(params)); // 注意这里用的是 call, 而不是 apply,
    };
};
var obj = {
    z: 1
};

function fn(x, y) {
    console.log(x + y + this.z);
};

var bound = fn.bind_(obj, 1);
bound(2); //4






// 3.版本三：使用 new 调用和普通调用的区分，为了让 this 不丢失

// 为啥要这么做：因为如果是用 new 调用这个绑定后的函数，是会丢失 obj 的绑定的（因为 new 时，内部会生成一个实例对象，并没有把绑定的那部分考虑进去https://www.cnblogs.com/echolun/p/10903290.html，
// 所以绑定的会丢失），因此，为了模拟用 new 的情况，应该就返回 this, 也就是丢失了绑定的情况。只有直接调用时才会返回一个绑定了的实例。这也印证了 this 绑定优先级的问题， new 等级最高： https://www.cnblogs.com/billyu/p/10063823.html

Function.prototype.bind_ = function (obj) {
    var fn = this;
    let args = [].slice.apply(arguments, 1)
    let bound = function () { // 注意这里需要将函数指定给一个变量，后面给这个变量改变原型后才能返回。这里和版本二不一样
        let params = [].slice.apply(arguments)
        // 通过 constructor 判断调用方式，为 true, this 指向实例，否则为 obj
        fn.apply(this.constructor === fn ? this : obj, args.concat.apply(params));
    };
    // 原型链继承
    bound.prototype = fn.prototype // 注意这里还要将函数的原型指向 fn 的原型，因为 bind 函数的特性4就是这一条，不能丢失
    return bound
};









// 4.版本四：借助一个中介函数，为了解决用 new 方式调用时，改变原型上的一个变量，所有的实例都会改变的问题

Function.prototype.bind_ = function (obj) {
    var fn = this;
    let args = [].slice.apply(arguments, 1)
    let bound = function () {
        let params = [].slice.apply(arguments)
        fn.apply(this.constructor === fn ? this : obj, args.concat.apply(params));
    };
    let fn_ = function() {} // 增加了一个中介函数
    fn_.prototype = fn.prototype // 将中介函数的原型指向 fn 的原型，再将即将返回的 bound 函数的原型指向中介的实例，相当于在 fn 和最后返回的 bound 函数中间隔了一层，这样就不会出现改变一个原型上的属性，其他实例也一起改变了的现象
    bound.prototype = new fn_()
    return bound
};

var z = 0;
var obj = {
    z: 1
};

function fn(x, y) {
    this.name = '听风是风';
    console.log(this.z);
    console.log(x);
    console.log(y);
};
fn.prototype.age = 26;

var bound = fn.bind_(obj, 2);
var person = new bound(3); //undefined 2 3

console.log(person.name); //听风是风
console.log(person.age); //26
person.__proto__.age = 18;
var person = new fn();
console.log(person.age); //26
