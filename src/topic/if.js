// 减少 if else 和 switch 的方法中的非分支法
// https://zhuanlan.zhihu.com/p/265601166


const dogSwitch = (breed) =>({
  "border": "Border Collies are good boys and girls.",
  "pitbull": "Pit Bulls are good boys and girls.",
  "german": "German Shepherds are good boys and girls.",  
})[breed]||'Im the default'; // 函数返回一个对象，这个中括号是对象属性以字符串形式获取的方式，如： obj['age']

console.log(dogSwitch("border"))


