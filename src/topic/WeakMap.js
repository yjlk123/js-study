// https://es6.ruanyifeng.com/#docs/set-map

// 注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key) // 注意 obj 被改了，指向其他地方，但是 key 对应的键值没有变，一定要记住，对象的基本用法
// Object {foo: 1}