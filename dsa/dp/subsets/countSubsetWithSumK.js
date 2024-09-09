//here you make one issue in tabulation not considering the zero so in dp array you also need to define the zeros

function countSubsetWithSum1(arr, i, target) {
  if (target === 0) return 1;
  if (i === 0) return arr[0] === target ? 1 : 0;

  let notpick = countSubsetWithSum1(arr, i - 1, target );
  let pick = 0;
  if (target >= arr[i]) {
    pick = countSubsetWithSum1(arr, i - 1, target - arr[i]);
  }

  return pick + notpick;
}

const arr = [1, 2, 3, 3];
const n = arr.length;
const target = 6;

function countSubsetWithSum(arr, target) {
  const dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(target + 1).fill(0);
  }

  for (let i = 0; i < n; i++) {
    dp[i][0] = 1;
  }

  if (arr[0] <= target) {
    dp[0][arr[0]] = 1;
  }

  for (let j = 1; j < arr.length; j++) {
    for (let sum = 0; sum <= target; sum++) {
      let notpick = dp[j - 1][sum];
      let pick = 0;
      if (sum >= arr[j]) {
        pick = dp[j - 1][sum - arr[j]];
      }

      dp[j][sum] = pick + notpick;
    }
  }

  return dp[arr.length - 1][target];
}

// console.log(countSubsetWithSum(arr, n - 1, target));
console.log(countSubsetWithSum(arr, target));
// console.log(findWays(arr, target))
