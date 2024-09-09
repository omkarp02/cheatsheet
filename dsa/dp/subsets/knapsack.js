//was able to do yourself
//just try solving recursive once

function knapsack1(weight, val, cap) {
  function helper(i, cap, weight, val) {
    if (i === 0) {
      return cap >= weight[i] ? val[i] : 0;
    }

    //keep this in mind
    let pick = Number.NEGATIVE_INFINITY;
    if (cap >= weight[i]) {
      pick = val[i] + helper(i - 1, cap - weight[i], weight, val);
    }

    let notpick = 0 + helper(i - 1, cap, weight, val);

    return Math.max(pick, notpick);
  }

  const n = weight.length;
  return helper(n - 1, cap, weight, val);
}

function knapsack(weight, val, cap) {
  const dp = Array.from({ length: weight.length }, () =>
    Array(cap + 1).fill(0)
  );

  for (let i = weight[0]; i <= cap; i++) {
    dp[0][i] = val[0];
  }

  for (let j = 1; j < weight.length; j++) {
    for (let k = 0; k <= cap; k++) {
      let notpick = 0 + dp[j - 1][k];
      let pick = Number.NEGATIVE_INFINITY;
      if (k >= weight[j]) {
        pick = val[j] + dp[j - 1][k - weight[j]];
      }
      dp[j][k] = Math.max(pick, notpick);
    }
  }

  console.log(dp)
  return dp[weight.length - 1][cap];
}

const weight = [3, 2, 5];
const val = [30, 40, 60];
const cap = 6;

console.log(knapsack(weight, val, cap));
