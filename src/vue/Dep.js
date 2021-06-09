class Dep {
  constructor() {
      // 保存所有的观察者列表
      this.subs = []
  }
  addSub(sub) { // 收集观察者
      this.subs.push(sub)
  }
  notify() { // 通知观察者就更新视图
      this.subs.forEach(w => w.update())
  }
}

export default Dep