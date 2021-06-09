class Observer {
  constructor(data) {
      this.observe(data)
  }
  observe(data) {
      // 如果设置的数据类型为对象就设置为响应式数据
      if (data && typeof data === 'object') {
          Object.keys(data).forEach(key => {
              //调用设置响应式数据的方法
              this.definePReactive(data, key, data[key])
          })
      };
  }
  // 设置属性为响应式数据
  definePReactive(obj, key, value) {
      // 利递归使深层属性转换为 响应式数据
      this.observe(value)
      const that = this; // 保存内部this, 方便内部调用
      // 负责收集依赖并发送通知
      let dep = new Dep();
      Object.defineProperty(obj, key, {
          enumerable: true,
          configurable: true,
          get() {
              // 订阅数据变化时, 往Dep中添加观察者, 收集依赖;
              Dep.target && dep.addSub(Dep.target);
              return value
          },
          set(newVal) {
              that.observe(newVal)
              if (newVal !== value) {
                  //如果新设置的值也为对象, 也转换为响应式数据
                  value = newVal;
              }
               // 发送通知;
              dep.notify()
          }
      })
  }
}

export default Observer