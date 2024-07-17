const dp = [];

function soln1(arr, n) {
  if (n === 0) return 0;

  if (dp[n]) return dp[n];
  const left = soln1(arr, n - 1) + Math.abs(arr[n] - arr[n - 1]);
  if (n > 1) {
    const right = soln1(arr, n - 2) + Math.abs(arr[n] - arr[n - 2]);
    dp[n] = Math.min(left, right);
    return Math.min(left, right);
  }

  dp[n] = left;
  return left;
}

const arr = [10, 20, 30, 10];

// console.log(soln1(arr, 3));

function soln2(arr, n) {
  const dp = [];
  dp[0] = 0;

  for (let i = 1; i < n; i++) {
    let fs = dp[i - 1] + Math.abs(arr[i] - arr[i - 1]);
    dp[i] = fs;
    if (i > 1) {
      let ss = dp[i - 2] + Math.abs(arr[i] - arr[i - 2]);
      dp[i] = Math.min(ss, fs);
    }
  }

  return dp[n - 1];
}

console.log(soln2(arr, 4));
