//was able to do youself


// Climbing Stars
//this is normal recursion
var climbStairs1 = function (n) {
  if (n === 0) {
    return 1;
  }

  if (n < 0) {
    return 0;
  }

  return climbStairs(n - 1) + climbStairs(n - 2);
};

//memomization

const dp = [];
var climbStairs2 = function (n) {
  if (n === 0) {
    return 1;
  }

  if (n < 0) {
    return 0;
  }

  if (dp[n] !== undefined) return dp[n];

  const val = climbStairs(n - 1) + climbStairs(n - 2);
  dp[n] = val;
  return val;
};

var climbStairs = function (n) {
  if (n === 0) {
    return 1;
  }

  if (n < 0) {
    return 0;
  }

  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};

console.log(climbStairs(3));
