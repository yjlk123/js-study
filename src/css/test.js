
function switchTop (topStr) {
  let top = ''
  switch (topStr) {
    case 10:
      top = 'A'
      break
    case 11:
      top = 'B'
      break
    case 12:
      top = 'C'
      break
    case 13:
      top = 'D'
      break
    case 14:
      top = 'E'
      break
    case 15:
      top = 'F'
      break
    default:
      top = topStr
      break
  }
  return top
}



function formatColor (color) {
  let result = []
  let resultStr = '#'
  let str = color.slice(4, color.length - 1)
  let rgbArr = str.split(',')
  let top = ''
  let bottom = ''
  console.log(rgbArr)
  for (let i = 0; i < rgbArr.length; i++) {
    rgbArr[i] = rgbArr[i].replace(/(^\s*)|(\s*$)/g, "")
    let topStr = Math.floor(rgbArr[i] / 16)
    let bottomStr = rgbArr[i] % 16
    top = switchTop(topStr)
    bottom = switchTop(bottomStr)
    result.push(top + '' + bottom)
  }
  result.forEach(item => {
    resultStr += item
  })
  return resultStr
}

console.log('Hello World!');

console.log(formatColor('RGB(0, 10, 255)'))




