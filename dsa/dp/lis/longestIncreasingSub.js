var lengthOfLIS1 = function (nums) {
  let n = nums.length;

  function helper(ind, prev) {
    if (ind === n) return 0;

    let length = 0 + helper(ind + 1, prev);

    if (prev === -1 || nums[prev] < nums[ind]) {
      length = Math.max(1 + helper(ind + 1, ind), length);
    }

    return length;
  }

  const ans = helper(0, -1);
  return ans;
};


//here co ordinate shift is done so instead of storing -1 in dp which we can't we start from 0
var lengthOfLIS = function (nums) {
  let n = nums.length

  let dp =  new Array(n + 1).fill([])

  function helper(ind, prev) {
    if (ind === n) return 0;

    if(dp[ind][prev + 1] !== undefined) return dp[ind][prev + 1]

    let length = 0 + helper(ind + 1, prev);

    if (prev === -1 || nums[prev] < nums[ind]) {
      length = Math.max(1 + helper(ind + 1, ind), length);
    }

    dp[ind][prev + 1] = length

    return length;
  }

  const ans = helper(0, -1);
  return ans;

};


const nums = [10, 9, 2, 5, 3, 7, 101, 18];

console.log(lengthOfLIS(nums));