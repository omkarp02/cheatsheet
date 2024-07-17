function soln1(arr, n) {
  if (n < 0) {
    return 0;
  }

  const left = arr[n] + soln1(arr, n - 2);
  const right = 0 + soln1(arr, n - 1);

  return Math.max(left, right);
}

const arr = [2, 1, 4, 9];

// console.log(soln1(arr, arr.length - 1));

const dp = [];

function soln2(arr, n) {
  if (n < 0) {
    return 0;
  }

  if (dp[n]) return dp[n];
  const left = arr[n] + soln2(arr, n - 2);
  const right = 0 + soln2(arr, n - 1);

  const final = Math.max(left, right);
  dp[n] = final;
  return final;
}

// console.log(soln2(arr, arr.length - 1));

function soln3(arr) {
  const dp = [];
  dp[0] = arr[0];
  const negative = 0;

  for (let i = 1; i < arr.length; i++) {
    const fs = i - 2 < 0 ? negative : dp[i - 2] + arr[i];
    const ss = dp[i - 1] + 0;
    dp[i] = Math.max(fs, ss);
  }

  return dp[dp.length - 1];
}

// console.log(soln3(arr))

function soln5(arr) {
  let prev = arr[0];
  let prev2 = arr[0];
  const negative = 0;

  for (let i = 1; i < arr.length; i++) {
    const fs = i - 2 < 0 ? negative : prev2 + arr[i];
    const ss = prev + 0;
    const cur = Math.max(fs, ss);
    prev2 = prev;
    prev = cur;
  }

  return prev;
}

// console.log(soln5(arr));

//house robber 2
//here not done this problem
function soln5(arr) {
  let prev = arr[0];
  let prev2 = arr[0];
  const negative = 0;

  for (let i = 1; i < arr.length; i++) {
    const fs = i - 2 < 0 ? negative : prev2 + arr[i];
    const ss = prev + 0;
    const cur = Math.max(fs, ss);
    prev2 = prev;
    prev = cur;
  }

  return prev;
}
