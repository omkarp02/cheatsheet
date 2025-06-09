var lengthOfLIS = function (nums) {
    function helper(i, prevInd) {
      if (ind === nums.length) return 0;
      //not take
      let length = helper(ind + 1, prevInd);
      //take
      if (prevInd === -1 || nums[prevInd] < nums[ind]) {
        length = Math.max(length, helper(ind + 1, ind) + 1);
      }
      return length;
    }
    return helper(0, -1);
  };
  
  var lengthOfLIS = function (nums) {
    const n = nums.length;
    const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
  
    for (let i = n - 1; i >= 0; i--) {
      for (let j = i - 1; j >= -1; j--) {
        let length = dp[i + 1][j + 1];
        if (j === -1 || nums[i] > nums[j]) {
          length = Math.max(length, dp[i + 1][i + 1] + 1);
        }
        dp[i][j + 1] = length;
      }
    }
  
    return dp[0][0];
  };
  