// 本文件夹为了验证常用的方法是深拷贝还是浅拷贝
// 结论：
// splice()、concat()、...对数组拷贝时，只有当数组内部属性值不是引用类型是，才能实现深拷贝。也就是只要属性是引用类型的，就是浅拷贝，我靠，我一直以为是深拷贝！