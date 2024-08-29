function subsetSumEqTarget(arr, n, sum, target) {
  if (n < 0) {
    return sum === target;
  }

  const pick = subsetSumEqTarget(arr, n - 1, sum + arr[n], target);
  const notpick = subsetSumEqTarget(arr, n - 1, sum, target);

  return pick || notpick
}

const arr = [3, 34, 4, 12, 5, 2];
const n = arr.length;
const target = 7

console.log(subsetSumEqTarget(arr, n - 1, 0, target));
