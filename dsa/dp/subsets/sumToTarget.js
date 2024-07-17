const arr = [2, 3, 1, 2];

const dp = [];

for (let _ of arr) {
  dp.push([]);
}

function soln1(n, target, arr) {
  if (target === 0) return true;
  if (n === 0) return arr[0] === target;

  if (dp[n][target]) return dp[n][target];

  const notTake = soln1(n - 1, target, arr);
  let take = false;
  if (arr[n] <= target) take = soln1(n - 1, target - arr[n], arr);

  dp[n][target] = notTake | take;
  return notTake | take;
}

// console.log(soln1(arr.length - 1, 4, arr));
// console.log(dp);

function soln2(n, t, arr) {
  const dp = [];
  for (let k = 0; k < n; k++) {
    dp[k] = [];
    dp[k][0] = true;
  }

  dp[0][arr[0]] = true;
  console.log(dp);

  for (let i = 1; i < n; i++) {
    for (let target = 1; target <= t; target++) {
      const notTake = dp[i - 1][target];
      let take = false;
      if (arr[i] <= target) take = dp[i - 1][target - arr[i]];

      dp[i][target] = notTake | take;
    }
  }

  return dp[n - 1][t];
}

console.log(soln2(arr.length, 4, arr));
