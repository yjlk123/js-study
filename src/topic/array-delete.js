// 在原有数组上删除指定元素

let nodeProps = ['dash', 'rect', 'font', 'textRect', 'text', 'fillStyle', 'strokeStyle', 'lineWidth', 'bkType', 'gradientFromColor', 'gradientToColor', 'gradientAngle', 'globalAlpha', 'gradientRadius']
let ignoreProps = ['text', 'rext']

// 这种方式有问题，可能 findIndex 的结果是负的，就会从末尾开始删
// if (ignoreProps && ignoreProps.length > 0) {
//   ignoreProps.forEach(item => {
//     nodeProps.splice(nodeProps.findIndex(ite => ite === item), 1)
//   })
// }

if (ignoreProps && ignoreProps.length > 0) {
  ignoreProps.forEach(item => {
    let index = nodeProps.indexOf(item)
    if(index > -1){
      nodeProps.splice(index, 1)
    }
  })
}

console.log(nodeProps);