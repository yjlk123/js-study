// 发布订阅模式

// 发布订阅模式 一共分为两个部分：on、emit。发布和订阅之间没有依赖关系，发布者告诉第三方（事件频道）发生了改变，第三方再通知订阅者发生了改变。
// on：就是把一些函数维护到数组中
// emit：让数组中的方法依次执行


let fs = require("fs");

let event = {
  arr: [],
  on(fn) {
    this.arr.push(fn);
  },
  emit() {
    this.arr.forEach(fn => fn());
  }
}

event.on(function () {
  console.log("读取了一个");
})

event.on(function () {
  if (Object.keys(school).length === 2) {
    console.log("读取完毕");
  }
})

let school = {};
fs.readFile('./name.txt', 'utf8', function (err, data) {
  school.name = data;
  event.emit();
});

fs.readFile('./age.txt', 'utf8', function (err, data) {
  school.age = data;
  event.emit();
});