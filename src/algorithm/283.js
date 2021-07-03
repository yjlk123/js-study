// leecode 283.移动零
// 通过但是时间和空间都太低
// 先遍历一遍，找出0 的位置，再遍历移动每2个0元素之间的元素，因为可以准确知道需要移动多少个，最后添0
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let zeroArr = []
  debugger
  nums.forEach((item, index) => {
    if (item === 0) {
      zeroArr.push(index)
    }
  })

  for (let i = 0; i < zeroArr.length; i++) {
    indexStart = zeroArr[i] + 1
    indexEnd = i !== zeroArr.length - 1 ? zeroArr[i + 1] - 1 : nums.length - 1
    for (let j = indexStart; j <= indexEnd; j++) {
      nums[j - i - 1] = nums[j]
    }
  }
  for (let k = nums.length - 1; k >= nums.length - zeroArr.length; k--) {
    nums[k] = 0
  }
  console.log(nums);
};

moveZeroes([0, 2, 3, 0, 2, 6, 0])


// 可以想象一排站军姿的学生

// 参考1：
// 和我的不同是，不需要记录0 的位置，只需要遇到非0 就往左移就可以，指针自己会记录要移动的位置，而不像我的需要记录 0 的位置、
// 很多时候我的都是因为要记录所以慢了，这种时候就应该考虑，这个要记录的东西重要吗必须吗？不重要就不要记
// 要学会变量数组的同时改指针下标的写法: num[j++] = num[i++]

class Solution {
  moveZeroes (nums) {
    if (nums == null) {
      return;
    }
    //第一次遍历的时候，j指针记录非0的个数，只要是非0的统统都赋给nums[j]
    let j = 0;
    for (let i = 0; i < nums.length; ++i) {
      if (nums[i] != 0) { // i 一直在走，而 j 只在非 0 的时候走，为 0 时少走一次，意思就是把位置空出来
        nums[j++] = nums[i];
      }
    }
    //非0元素统计完了，剩下的都是0了
    //所以第二次遍历把末尾的元素都赋为0即可
    for (let i = j; i < nums.length; ++i) {
      nums[i] = 0;
    }
  }
}


// 参考2：
/**
     * 双指针法（参考快排） https://leetcode-cn.com/problems/move-zeroes/solution/dong-hua-yan-shi-283yi-dong-ling-by-wang_ni_ma/
     * @param nums
     */
let moveZeroes1 = function (nums) {
  // 初始化双指针
  //  j指针用于找中间点0
  let j = 0;
  // i指针用于找中间点右侧非0元素
  for (let i = 0; i < nums.length; i++) {
    // 如果两个指针指向元素均不为0，整体右移一位
    if (nums[j] != 0 && nums[i] != 0) {
      j++;
    }
    // 如果j指针找到了中间点0，i没有找到中间点右侧非0元素
    else if (nums[j] == 0 && nums[i] == 0) {
      continue;
    }
    // 如果j指针找到了中间点0，i找到了中间点右侧非0元素
    else if (nums[j] == 0 && nums[i] != 0) { // j 始终跟着 0 走，并且是最左边的0，为了减少移动次数；
      // 解题思路是：移动所有的 0 向右，有 0 的空位出来了就将右边非0 的填坑到 0 的位置，这样就像是 0 在非0组成的队伍里向后移动 ，也就保证了数据相对位置不变（可以想象一排站军姿的学生）
      // 和参考1 最大的不同是，这个是交换（分成类似快排的两部分，只不过这里条件是0，不是中间点）；而参考1是赋值，最后统一给末尾赋值为0
      let temp = nums[j];
      nums[j] = nums[i];
      nums[i] = temp;
      j++;
    }
  }
}

