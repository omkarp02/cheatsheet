const dp = [];

function soln1(n) {
  if (n <= 1) {
    return 1;
  }

  if (dp[n]) return dp[n];
  const val = soln1(n - 1) + soln1(n - 2);
  dp[n] = val;
  return val;
}

// console.log(soln1(1555))

function soln2(n) {
  if (n <= 1) {
    return 1;
  }

  let prev2 = 1;
  let prev = 1;

  for (let i = 2; i <= n; i++) {
    const cur = prev2 + prev;
    prev2 = prev;
    prev = cur;
  }
  return prev
}

console.log(soln2(555555555));
