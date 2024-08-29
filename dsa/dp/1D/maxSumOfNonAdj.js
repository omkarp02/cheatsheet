//this one just try drawing the recursion tree rest was able to do yourself
//here tabulation see commment
//try solving in recusion and tabulation yourself

var rob1 = function (nums) {
  function helper(nums, n) {
    if (n === 0) {
      return nums[n];
    }

    if (n < 0) return 0;

    const notpick = 0 + helper(nums, n - 1);

    const pick = nums[n] + helper(nums, n - 2);

    return Math.max(pick, notpick);
  }

  return helper(nums, nums.length - 1);
};

var rob2 = function (nums) {
  const dp = [];
  function helper(nums, n) {
    if (n === 0) {
      return nums[n];
    }

    if (n < 0) return 0;

    if (dp[n] !== undefined) return dp[n];

    const notpick = 0 + helper(nums, n - 1);

    const pick = nums[n] + helper(nums, n - 2);

    dp[n] = Math.max(pick, notpick);

    return Math.max(pick, notpick);
  }

  return helper(nums, nums.length - 1);
};

var rob3 = function (nums) {
  const dp = [];
  dp[0] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    let pick = nums[i];

    //here you messed up
    if (i > 1) pick += dp[i - 2];

    const notpick = 0 + dp[i - 1];

    dp[i] = Math.max(pick, notpick);
  }

  return dp[nums.length - 1];
};

var rob = function (nums) {
  let prev = nums[0];
  let prev2 = 0;

  for (let i = 1; i < nums.length; i++) {
    let pick = nums[i];

    //here you messed up
    if (i > 1) pick += prev2;

    const notpick = 0 + prev;

    prev2 = prev;
    prev = Math.max(pick, notpick);
  }

  return prev;
};

const nums = [1, 2];

console.log(rob(nums));
