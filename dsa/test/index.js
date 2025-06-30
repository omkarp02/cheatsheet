var lengthOfLIS = function (nums) {
  const dp = new Array(nums.length).fill(1);
  const backtrack = new Array(nums.length).fill(0);
  for (let i = 1; i < nums.length; i++) {
    let max = dp[i];
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i] && dp[i] + dp[j] > max) {
        backtrack[i] = j;
        max = dp[i] + dp[j];
      }
    }
    dp[i] = max;
  }
  console.log(backtrack);
  return Math.max(...dp);
};

var largestDivisibleSubset = function (nums) {
  nums.sort()
  const dp = [];
  const backtrack = [];
  for (let i = 0; i < nums.length; i++) {
    dp[i] = 1;
    backtrack[i] = i;
  }
  let maxIndex = 0;
  for (let i = 1; i < nums.length; i++) {
    let max = dp[i];
    for (let j = 0; j < i; j++) {
      if (
        (nums[j] % nums[i] === 0 || nums[i] % nums[j] === 0) &&
        dp[i] + dp[j] > max
      ) {
        backtrack[i] = j;
        max = dp[i] + dp[j];
      }
    }
    if (max > dp[maxIndex]) {
      maxIndex = i;
    }

    dp[i] = max;
  }
  console.log(backtrack);
  console.log(dp[maxIndex]);
  const ans = [];
  ans.unshift(nums[maxIndex]);

  while (maxIndex !== backtrack[maxIndex]) {
    maxIndex = backtrack[maxIndex];
    ans.unshift(nums[maxIndex]);
  }


  return ans;
};
const nums = [5,9,18,54,108,540,90,180,360,720]

console.log(largestDivisibleSubset(nums));
