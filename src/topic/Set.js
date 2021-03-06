// Set 是 es6 的新特性

// 1.特点：ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。所以可以用于数组去重
// https://www.cnblogs.com/wjcoding/p/11690886.html
// https://es6.ruanyifeng.com/#docs/set-map

const s = new Set()
let arr = [2, 3, 5, 4, 5, 2, 2]
arr.forEach(x => s.add(x));

console.log(s); // Set(4) {2, 3, 5, 4}
console.log([...s]); // (4) [2, 3, 5, 4] // 变成数组了, 因为把这个对象一一展开了，又放进数组里了，所以变成了数组
console.log(typeof s); // object
console.log(Object.prototype.toString.call(s)); // [object Set] 居然是个新的类型，不属于其他几种类型


const items = new Set([1,2,3,4,5,5,5,5,]);
console.log(items.size); // 5

// set中NaN等于自身，其余比较相当于 ===
let set3 = new Set();
let a = NaN;
let b = NaN;
set3.add(a);
set3.add(b);
console.log(set3)



// 使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
