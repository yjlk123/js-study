// 有没有一种方法能让同步函数同步执行，异步函数异步执行。答：有2种方法: async 函数；new Promise；



// // 1.async 方式 注意： 这里面就不需要写 new Promise 了
// // async 里如果是同步的，就会同步执行，如果是异步的就会异步执行，很神奇，以下代码通过开关 A 和 B 两个代码块来对比
// const f = () => console.log('now'); // 同步函数
// const f1 = () => { // 异步函数
//     setTimeout(() => {
//         console.log('now');
//     }, 1000)
// }
// // (async () => f())() // A
// (async () => f1())().then(res => {
// }) // 需要注意的是，async () => f()会吃掉f()抛出的错误。所以，如果想捕获错误，要使用promise.catch方法 // B
// console.log('next');





// // 2.1 new Promise 的方式 这种方式也能达到同步执行，异步函数异步执行的目的；注意对比方法1，这里用了 Promise, 方法1里没有用.
// const f2 = () => console.log('now');  // 同步函数  // A
// const f3 = () => {  // 异步函数  // B
//     setTimeout(() => {
//         console.log('now');
//     }, 1000)
// }
// (
//     // () => new Promise(
//     //     resolve => resolve(f3()) 
//     // )
//     () => Promise.resolve(f3()) // 这种书写方式同上面注释的部分一样的，因为这种写法是语法糖
// )();
// console.log('next');



// 2.2 可以用 Promise.try() 来代替 2.1  ??? 有报错，可能还只是个提案，没有正式引入吧 ???
const f5 = () => console.log('now');
let a = new Promise.try(f5); // 注意这里不需要执行，只需要传入指向函数的变量做参数即可

