// leecode 5.最长回文子串
// 方法1 中心扩展 不准确
let long = function (s) {
  let left = 0, center = 0, right = 0, lenLeft = 0, lenRight = 0, lenBoth = 0, maxLen = 0, maxLeft = 0, maxRight = 0
  if (s.length <= 0) {
    return ''
  }
  if (s.length === 1) {
    return s
  }

  function getPlainRound (left, right, center) {
    let len = 0
    if (!right) { // 向左
      left--
      while (left >= 0 && s[left] === s[center]) {
        len++
        left--
      }
    } else if (!left) { // 向右
      right++
      while (right <= s.length - 1 && s[right] === s[center]) {
        len++
        right++
      }
    } else {
      left--
      right++
      while (left >= 0 && right <= s.length - 1 && s[left] === s[right]) {
        len += 2
        left--
        right++
      }
    }
    return len
  }

  for (let i = 0; i < s.length; i++) {
    left = right = center = i
    while (left >= 0 && s[left] === s[center]) {
      left--
    }
    while (right <= s.length - 1 && s[right] === s[center]) {
      right++
    }
    while (left >= 0 && right <= s.length - 1 && s[left] === s[right]) {
      left--
      right++
    }

    if (right - left - 2 + 1 > maxLen) {
      maxLen = right - left - 2 + 1 > maxLen ? right - left - 2 + 1 : maxLen
      maxLeft = left + 1
      maxRight = right - 1
    }
  }
  console.log(s.slice(maxLeft, maxRight + 1))
  return s.slice(maxLeft, maxRight + 1)
}

long("aaabaaaa")


// 方法2 动态规划

// 使用二维数组记录坐标，因为确实是下标比字符串更重要
let dynamic = function () {
  class Solution {
    longestPalindrome (s) {
      let n = s.length();
      let dp = new boolean[n][n];
      let ans = "";
      for (let l = 0; l < n; ++l) { // l 是两数之间的距离
        for (let i = 0; i + l < n; ++i) {
          let j = i + l;
          if (l == 0) {
            dp[i][j] = true;
          } else if (l == 1) {
            dp[i][j] = (s.charAt(i) == s.charAt(j));
          } else {
            dp[i][j] = (s.charAt(i) == s.charAt(j) && dp[i + 1][j - 1]); // 由于两数间距离是 l, l 从小变大的，所以一定能保证更短距离里的数都已经赋过值了
          }
          if (dp[i][j] && l + 1 > ans.length()) {
            ans = s.substring(i, i + l + 1);
          }
        }
      }
      return ans;
    }
  }
}