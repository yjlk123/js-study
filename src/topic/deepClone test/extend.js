let a = [
  1,
  {
    a: 2
  },
  3
]

let b = [...a]
b[1].a = 5

console.log(a);
console.log(b);