let a = [
  1,
  {
    a: 2
  },
  3
]

let b = a.slice(1)
b[0].a = 5

console.log(a);
console.log(b);