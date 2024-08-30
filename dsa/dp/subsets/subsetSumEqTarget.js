//here always make sure you keep the argument so that they can be converted to dp like i is index and target is like decreasing to zero which can be written in dp from bottom to top approch
//this just watch video on time if you don't understand
//this 1st and 3rd video is very important

function subsetSumEqTarget1(arr, i, target) {
  if (target === 0) return true;
  if (i === 0) return arr[0] === target;

  let pick = false;
  if (target >= arr[i]) {
    pick = subsetSumEqTarget1(arr, i - 1, target - arr[i]);
  }
  const notpick = subsetSumEqTarget1(arr, i - 1, target);

  return pick || notpick;
}

// dp[i][target];
function subsetSumEqTarget(arr, target) {
  const dp = [];

  for (let i = 0; i < arr.length; i++) {
    dp[i] = [];
    dp[i][0] = true;
  }

  dp[0][arr[0]] = true;

  for (let j = 1; j < arr.length; j++) {
    for (let t = 1; t <= target; t++) {
      let notpick = dp[j - 1][t];
      let pick = false;
      if (target >= arr[j]) {
        pick = dp[j - 1][t - arr[j]];
      }

      dp[j][t] = pick || notpick;
    }
  }

  console.log(dp[arr.length - 1])

  return !!dp[arr.length - 1][target];
}

const arr = [3, 34, 4, 12, 5, 2];
const n = arr.length;
const target = 7;
console.log(subsetSumEqTarget(arr, target));
// console.log(subsetSumEqTarget1(arr, n - 1, target));
