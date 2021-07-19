// 在vue的自定义事件中$on可以绑定多个不同或相同名称的事件，所以就要把$on注册的事件放到对象中去，并且该事件的处理函数是在一个数组中保存，当$emit触发某个事件时，会执行这个事件中的多个事件处理函数

// 链接：https://www.jianshu.com/p/1179ef87888b

//订阅多个事件
$on("change",fn1)
$on("change",fn2)
$on("click",fn3)
$on("click",fn4)
//其形式如下
{
"click":[fn3,fn4],
"change":[fn1,fn2]
}
//当$emit发布事件时会传入事件名称，然后该事件下的所有事件处理函数会被执行
$emit('click');//会执行fn3()，fn4()