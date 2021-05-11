// 实现数组的取交集，并集，差集

let arr1 = [1, 2, 3]
let arr2 = [2, 3, 5, 6]

// 1.实现数组的交集
let intersection = function (arr1, arr2) {
  return arr1.filter(item => {
    return arr2.includes(item)
  })
}


console.log(intersection(arr1, arr2));


// 2.实现数组的并集
// 方法1
let union = function (arr1, arr2) {
  let unionResult = [].concat(arr1).concat(arr2) // concat 居然可以链式调用诶，神奇！
  unionResult = [...new Set(unionResult)] // 注意：如果不使用扩展函数的话，结果是个 Set 对象而不是数组。同理，也可以用 Array.from
  // unionResult = Array.from(new Set(unionResult))
  return unionResult
}

console.log(union(arr1, arr2));

// 方法2：
let a = [1, 2, 3];
let b = [2, 4, 5];

let union = a.concat(b.filter(v => !a.includes(v)));

console.log(union); // [ 1, 2, 3, 4, 5 ]



// 3.差集

let a = [1, 2, 3];
let b = [2, 4, 5];

let difference = a.concat(b).filter(v => !a.includes(v) || !b.includes(v));

console.log(difference); // [ 1, 3, 4, 5 ]




