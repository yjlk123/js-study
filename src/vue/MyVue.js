import Observer from './Observer.js'

class Vue {
  constructor(options) {
      // 限定Options类型为对象, 如果类型不为对象, 就抛出一个错误
      if (!(options instanceof Object)) throw new TypeError('The parameter type should be an Object');
      // 保存options中的数据
      this.$options = options || {};
      this.$data = options.data || {};
      this.$el = options.el;
      // 将vue实例中的data属性转换为 getter和setter, 并注入到vue实例中, 方便调用vm.msg
      this._proxyData(this.$data)
      //调用Observer类, 进行数据监听
      new Observer(this.$data)
      // 如果el元素有值, 调用Compiler类, 解析指令和插值表达式
      if (this.$el) new Compiler(this.$el, this)

  }
  _proxyData(data) {
      // 遍历data属性的key, 利用Object,definePrototype 进行数据劫持
      Object.keys(data).forEach(key => {
          Object.defineProperty(this, key, {
              enumerable: true,
              configurable: true,
              set(newVal) {
                  if (newVal !== data[key]) data[key] = newVal;
              },
              get() {
                  return data[key]
              }
          })
      })
  }
}

export default Vue