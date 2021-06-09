class Watcher {
  constructor(vm, key, callback = value => {}) {
      this.vm = vm;
      // data中的属性名
      this.key = key;
      //回调函数负责更新视图
      this.callback = callback;
      //先把旧值保存起来;
      this.oldValue = this.getOldValue()
  }
  getOldValue() {
      // 把Watcher对象挂载到 Dep类的静态属性 target中
      Dep.target = this;
      const oldVal = Compiler.compileUtil.getVal(this.key, this.vm);
      // 清空watcher对象,避免重复设置
      Dep.target = null; 
      return oldVal
  }
  // 当数据发生改变时更新视图
  update() {
      const newVal = Compiler.compileUtil.getVal(this.key, this.vm);
      if (newVal !== this.oldValue) {
          //当数据发生改变调用callback并传递新值
          this.callback(newVal)
      }
  }
}

export default Watcher