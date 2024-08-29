//was able to do youself

function frogJump1(arr, n) {
  if (n === 0) {
    return 0;
  }

  const left = frogJump1(arr, n - 1) + Math.abs(arr[n] - arr[n - 1]);

  if (n > 1) {
    const right = frogJump1(arr, n - 2) + Math.abs(arr[n] - arr[n - 2]);
    return Math.min(left, right);
  }
  return left;
}

function frogJump1(arr, n) {
  if (n === 0) {
    return 0;
  }

  if (dp[n] !== undefined) return dp[n];
  const left = frogJump1(arr, n - 1) + Math.abs(arr[n] - arr[n - 1]);

  if (n > 1) {
    const right = frogJump1(arr, n - 2) + Math.abs(arr[n] - arr[n - 2]);
    dp[n] = Math.min(left, right);
    return Math.min(left, right);
  }

  dp[n] = left;
  return left;
}

const arr = [10, 20, 30, 10];
const n = 4;

const dp = [];
function frogJump3(arr, n) {
  dp[0] = 0;

  for (let i = 1; i < n; i++) {
    const left = dp[i - 1] + Math.abs(arr[i] - arr[i - 1]);
    dp[i] = left;

    if (i > 1) {
      const right = dp[i - 2] + Math.abs(arr[i] - arr[i - 2]);
      dp[i] = Math.min(left, right);
    }
  }

  return dp[n - 1];
}

function frogJump(arr, n) {
  let prev = 0;
  let prev2 = 0;

  for (let i = 1; i < n; i++) {
    const left = prev + Math.abs(arr[i] - arr[i - 1]);
    let cur = left;

    if (i > 1) {
      const right = prev2 + Math.abs(arr[i] - arr[i - 2]);
      cur = Math.min(left, right);
    }

    prev2 = prev;
    prev = cur;
  }

  return prev;
}

console.log(frogJump(arr, n - 1));
