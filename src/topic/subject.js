// 各种面试题

// 1.
var a = new String('A');
function showCase (data) {
    switch (data) {
        case 'A':
            console.log(1);
            break;
        //中间还有一堆，我省略了
        default:
            console.log(5);
            console.log(data);
            console.log(typeof data);
    }
}
showCase(a);