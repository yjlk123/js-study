// map 
// https://www.cnblogs.com/xiaoliziaaa/p/13334895.html

// 1.初始化map的三种方式 
// 注意 map 对象打印的结果，形式很特别
// Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。 
// map对象常用于保存键值对，它的键是任意数据类型，常用于建立数据的映射关系
// 和对象的区别：Object对象的key只能是字符串或者Symbol，map的key可是是任意数据类型;Map的key是有序的；map的键值对个数通过size属性获取，对象只能自己统计

// 1.
const map1 = new Map()
map1.set(60, '及格')
map1.set(80, '良')
map1.set(90, '优秀')
// 第二种方式 set方法返回的是当前map对象，因此可以采用链式写法
const map2 = new Map().set(60, '及格').set(80, '良').set(90, '优秀').set(90, '优秀1') // 重复的 key 后者会覆盖前者，只能有唯一的 key
// 传入二维数组
const map3 = new Map([[60, '及格'], [80, '良'], [90, '优秀'],])
console.log(map3,map2);//Map { 60 => '及格', 80 => '良', 90 => '优秀' }



// 2.
// 对同一个key进行多次赋值，后面值会覆盖前面的值。说明map对象key唯一
// map对象的key是跟内存地址绑定的。引用数据类型需要指向同一个内存地址才是同一个key
// map对象key是基本数据类型，只要它们是严格相等=== map将其是作为同一个key
// undefined 和 null是两个不同的key

let myMap = new Map();
  let keyObj = {};
  let keyFunc = function () { };
  let keyArr = []
  let keyString = 'a string';
  let strNum = '0'
  


  // 添加键
  myMap.set(keyString, "和键'a string'关联的值");
  myMap.set(keyObj, "和键keyObj关联的值");
  myMap.set(keyArr, "和键keyArr关联的值");
  myMap.set(keyFunc, "和键keyFunc关联的值");
  myMap.set(strNum, "和键strNum关联的值");
  myMap.set(null,'和null key关联的值')
  myMap.set(undefined,'和 undefined key关联的值')


  console.log(myMap.get(keyObj)) //和键keyObj关联的值
  console.log(myMap.get(keyArr)) //和键keyArr关联的值
  console.log(myMap.get(keyFunc)) // 键keyFunc关联的值
  console.log(myMap.get(strNum)) //和键strNum关联的值
  console.log(myMap.get(keyString)) // 键'a string'关联的值
  
  

  console.log(myMap.get({})); //undefined 
  console.log(myMap.get([])); //undefined
  console.log(myMap.get(function () { })); //undefined
  console.log(myMap.get(0)) //undefined
  console.log(myMap.get('a string')); // 键'a string'关联的值
  console.log(myMap.get(null)); //和null key关联的值
  console.log(myMap.get(undefined)); //和 undefined key关联的值



// 3.
// map对象的基本方法
// size属性，返回map的长度
//  get (key) 返回键对应的值，如果不存在，则返回undefined。
//  has(key) 返回一个布尔值，表示Map实例是否包含键对应的值。
//   delete(key )如果 Map 对象中存在该元素，则移除它并返回 true；否则如果该元素不存在则返回 false。
const map1 = new Map()
  map1.set(60, '及格')
  map1.set(80, '良')
  map1.set(90, '优秀')
  map1.set(90, '有优秀')


  console.log(map1.has(60)) //true
  console.log(map1.has('60')) //false

  console.log(map1.delete(80)); //true 删除已有的key 原map会改变，返回值true
  console.log(map1.size); //2
  console.log(map1.delete('80')); //false 删除不存在的key 原map不改变，返回值false
  console.log(map1.size); //2




