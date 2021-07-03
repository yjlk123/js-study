// leecode 26. 删除有序数组中的重复项

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let preNum = null, pointer = 0
  nums.sort(function (a, b) { return a - b }) // 不需要排序，题目说了有序
  preNum = nums[0]
  if (nums.length <= 0) {
    return 0
  }
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== preNum) {
      nums[pointer] = preNum
      preNum = nums[i]
      pointer++
    }
    if (i === nums.length - 1) {
      nums[pointer] = preNum
      pointer
    }
  }
  console.log(nums);
  return pointer + 1
};

removeDuplicates([1, 3, 2, 1])


// 借鉴：
// 优点：不需要一个变量来记录上一次数据，直接不相等时赋值即可
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (nums.length == 0) {
    return 0;
  }
  let lastIndex = 0;
  for (let l = 1; l < nums.length; l++) {
    if (nums[l] !== nums[lastIndex]) {
      lastIndex++;
      nums[lastIndex] = nums[l];
    }
  }
  nums.length = lastIndex + 1; // 可以通过指定一个数组的长度来截取数组多少位之前的数据
  return nums.length;
};