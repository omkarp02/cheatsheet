function soln(arr, index, step, dp) {
  if (index + arr[index] >= arr.length - 1) {
    return step + 1;
  }
  if (dp[index][step]) return dp[index][step];
  let min = Infinity;
  for (let i = index + 1; i <= arr[index] + index; i++) {
    min = Math.min(soln(arr, i, step + 1, dp), min);
  }
  dp[index][step] = min;
  return min;
}

const arr = [2, 3, 1, 1, 4];

const dp = [];

for (let _ of arr) {
  dp.push([]);
}

console.log(dp[2][2]);

console.log(soln(arr, 0, 0, dp));
