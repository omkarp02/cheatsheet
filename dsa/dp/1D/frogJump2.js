//was able to do youself

function minimizeCost1(arr, n, k) {
  if (n === 0) {
    return 0;
  }

  let min = Infinity;
  for (let i = 1; i <= k; i++) {
    if (n - i >= 0) {
      const jump = minimizeCost1(arr, n - i, k) + Math.abs(arr[n] - arr[n - i]);
      min = Math.min(min, jump);
    }
  }

  return min;
}

function minimizeCost2(arr, n, k) {
  if (n === 0) {
    return 0;
  }

  if (dp[n] !== undefined) return dp[n];
  let min = Infinity;
  for (let i = 1; i <= k; i++) {
    if (n - i >= 0) {
      const jump = minimizeCost2(arr, n - i, k) + Math.abs(arr[n] - arr[n - i]);
      min = Math.min(min, jump);
    }
  }

  dp[n] = min;
  return min;
}

const dp = [];
function minimizeCost(arr, n, k) {
  dp[0] = 0;

  for (let i = 1; i < n; i++) {
    let min = Infinity;
    for (let j = 1; j <= k; j++) {
      if (i - j >= 0) {
        const jump = dp[i - j] + Math.abs(arr[i] - arr[i - j]);
        min = Math.min(min, jump);
      }
    }
    dp[i] = min;
  }

  return dp[n - 1]
}

const arr = [10, 20, 10];
const k = 1;

console.log(minimizeCost(arr, arr.length, k));
