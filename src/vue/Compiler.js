class Compiler { // 解析指令, 编译模板
  static compileUtil = {// 解析指令的对象
      getVal(key, vm) {// 获取指令上的数据值
          //利用reduce 获取实例对象深层的属性值 
          return key.split('.').reduce((data, current) => {
              return data[current]
          }, vm.$data)
      },
      // 改变实例上的数据
      setVal(key, vm, inputVal) {// key 属性值, vm: vue实例对象, inputVal: 输入框的值
          let total = 'vm';// 用于拼接 出 vm['person']['name'] = inputVal
          if (key.split('.').length === 1) vm[key] = inputVal;
          else {
              // 对字符串进行拼接
              key.split('.').forEach(k => total += `['${k}']`)
              total += '=' + `${'inputVal'}`
              eval(total) // 利用eval强行将字符串解析为函数执行
          }
      },
      text(node, key, vm) { // 编译v-text指令的方法
          let value;// 保存获取的数据值
          if (/\{\{(.+?)\}\}/.test(key)) {
              // 全局匹配{{}}里面的变量, 利用...运算符展开 匹配的内容
              // 利用正则解析出{{xxx.xx}}中的变量, 并取出相应的变量值
              value = key.replace(/\{\{(.+?)\}\}/, (...args) => {
                  // 创建watcher对象, 当数据改变时, 更新视图
                  new Watcher(vm, args[1], newVal => { // 接受callback执行时第一个参数
                      this.updater.textUpdater(node, newVal)
                  })
                  return this.getVal(args[1], vm);
              })
          } else {
              // 获取key 对应的数据
              value = this.getVal(key, vm);
          }
          // 更新视图
          this.updater.textUpdater(node, value)
      },
      model(node, key, vm) {// 解析v-model 指令
          const value = this.getVal(key, vm);
          /// 数据 => 视图 
          new Watcher(vm, key, newVal => {
              this.updater.modelUpdater(node, newVal)
          })
          // 视图 => 数据 => 视图 双向数绑定
          node.addEventListener('input', e => {
              this.setVal(key, vm, e.target.value)
          })
          this.updater.modelUpdater(node, value)
      },
      html(node, key, vm) {// 解析HTML指令
          const value = this.getVal(key, vm);
          new Watcher(vm, key, newVal => {
              this.updater.htmlUpdater(node, newVal)
          })
          this.updater.htmlUpdater(node, value)
      },
      on(node, key, vm, eventName) {// 解析v-on:click指令
          // 获取实例对象中的methods中的方法
          const fn = vm.$options.methods && vm.$options.methods[key];
          // 绑定事件
          node.addEventListener(eventName, function (ev) {
              fn.call(vm, ev)// 改变fn函数内部的this,并传递事件对象event
          }, false)
      },
      bind(node, key, vm, AttrName) {// 解析 v-bind 指令
          node[AttrName] = vm.$data[key]
      },
      updater: {// 保存所有更新页面视图的方法的对象
          textUpdater(node, value) {
              node.textContent = value
          },
          htmlUpdater(node, value) {
              node.innerHTML = value
          },
          modelUpdater(node, value) {
              node.value = value
          }
      }
  }
  constructor(el, vm) {
      this.el = this.isElementNode(el) ? el : document.querySelector(el);
      this.vm = vm;
      // 获取文档碎片, 减少页面的回流和重绘
      const fragment = this.nodeFragment(this.el);
      // 编译文档碎片
      this.compile(fragment)
      // 追加到根元素
      this.el.appendChild(fragment)
  }
  nodeFragment(el) {
      // 创建文档碎片
      const fragment = document.createDocumentFragment();
      // 如果当前第一个子节点有值, 追加到文档碎片
      while (el.firstChild) {
          fragment.appendChild(el.firstChild)
      }
      return fragment
  }
  compile(fragment) {
      // 获取子节点
      const childNodes = fragment.childNodes;
      // 遍历所的子节点
      [...childNodes].forEach(child => {
          // 如果为元素节点
          if (this.isElementNode(child)) {
              this.compileElement(child)
          } else {
              // 解析文本节点
              this.compileText(child)
          }
          // 如果子节点还有子节点元素就递归遍历该子节点
          if (child.childNodes && child.childNodes.length) {
              this.compile(child)
          }
      })
  }
  compileElement(node) { // 编译元素节点
      const {compileUtil} = Compiler;
      // 获取元素节点的所有自定义属性
      const attributes = node.attributes;
      //利用展开运算符将attributes类数组对象转换为数组并遍历
      [...attributes].forEach(attr => {
          //将v-mode=msg 中的 v-model 和 msg 解构出来
          const {name, value} = attr;
          //判断属性是否为 v-开头
          if (this.isDirective(name)) {
              // 解构出v-text 中的 text
              const [, directive] = name.split('-');
              // 解构出 v-on:click 中的 on 和 click
              const [dirname, eventName] = directive.split(':');
              // 利用策略组合模式 调用相应的解析方法并 更新数据 数据驱动视图
              compileUtil[dirname](node, value, this.vm, eventName)
              // 删除有指令的标签上的属性
              node.removeAttribute('v-' + directive)
          }
      })
  }
  compileText(node) { // 编译文本节点
      const text = node.textContent;
      // 把Compiler类中的compileUtil对象解构出来
      const {  compileUtil} = Compiler;
      let reg = /\{\{(.+?)\}\}/;// 匹配 {{xx.xx}}的正则
      if (reg.test(text)) { // 如果是 {{}}的文本节点
          compileUtil['text'](node, text, this.vm)
      }
  }
  isDirective(attrName) { // 是否为v-开头的指令
      return attrName.startsWith('v-')
  }
  isElementNode(node) { // 是否为 元素节点
      return node.nodeType === 1;
  }
}

export default Compiler