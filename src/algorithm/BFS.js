// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/9
// 广度优先：找到一个节点后，把他同级的兄弟节点都找出来放在前边，把孩子放到后边，最常用 while

// 广度优先遍历
// 注意对比 dfs 的非递归遍历,有2处不同，正是这2处不同，形成了这样的区别：
// dfs 在放数时是将子节点挨个排在数组后面，并且取时是从最后一个开始处理，这个取出来的数的孩子节点又会排在数组后面，这就让上一次的数据还在最前面，没有处理出来，
// 就是实现了深度遍历。反之 bfs 每次推入数据也是排在数组后面，但是取数是从前面开始取数，这样就保证了先入队列的先出，即实现了广度优先遍历

// 注意广度优先一般不用递归，因为递归调用栈的顺序决定了不能实现队列的功能
let widthTraversal2 = (node) => {
  let nodes = []
  let stack = []
  if (node) {
    stack.push(node)
    while (stack.length) {
      let item = stack.shift() // 注意对比 dfs 的非递归遍历，区别第一处在这里
      let children = item.children
      nodes.push(item)
        // 队列，先进先出
        // nodes = [] stack = [parent]
        // nodes = [parent] stack = [child1,child2,child3]
        // nodes = [parent, child1] stack = [child2,child3,child1-1,child1-2]
        // nodes = [parent,child1,child2]
      for (let i = 0; i < children.length; i++) { // 区别第二处在这里
        stack.push(children[i])
      }
    }
  }
  return nodes
}
