// 发布定于模式的简单实现
// 官网： https://cn.vuejs.org/v2/api/#vm-on


class eventEmiter {
  constructor(){
    //this.subs = {}
    //这样写可以提高性能，没有继承任何原型方法，原型链上没有上一层
    this.subs = Object.create(null)
  }
  $on(eventType,handler) {
    this.subs[eventType] = this.subs[eventType] || [];
    this.subs[eventType].push(handler)
  }
  $emit(eventType) {
    this.subs[eventType].forEach(handler => {
      handler();
    })
  }
}
//进行测试
const em = new eventEmiter()
em.$on('add',()=>{
  console.log('add1');
})
em.$on('add',()=>{
  console.log('add2')
})
em.$emit('add')