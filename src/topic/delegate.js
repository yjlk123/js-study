// 1.1事件委托
// https://juejin.cn/post/6855129007852093453

// 1.1有点小 bug 的简单版本,如果用户点击的是 li 里面的 span，就没法触发 fn，这显然不对
// https://juejin.cn/post/6855129007852093453
ul.addEventListener('click', function (e) {
    console.log(e,e.target)
    if (e.target.tagName.toLowerCase() === 'li') {
        console.log('打印')  // 模拟fn
    }
})

// 1.2 改进版本
// https://juejin.cn/post/6855129007852093453
// element: 相当于版本1里的 ul; selector: 相当于版本1里的 li
function delegate(element, eventType, selector, fn) {
    element.addEventListener(eventType, e => {
        let el = e.target // 鼠标点击或双击等事件的目标元素
        while (!el.matches(selector)) {
            if (element === el) { // 找到绑定事件的最顶层就退出
                el = null
                break
            }
            el = el.parentNode
        }
        el && fn.call(el, e, el) // 注意这里调用函数的方式
    },true)
    return element
}
