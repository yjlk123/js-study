// 解决0.1+0.2不等于0.3的精确度提高函数
// https://blog.csdn.net/runjieli/article/details/105265816

function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} // 注意 toString() 的方法，不是toString
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m;
}
console.log(0.1+0.2);
var result = accAdd(0.1,0.2)
console.log(result)
