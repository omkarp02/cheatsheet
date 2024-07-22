function soln(nums) {
  let max = Number.NEGATIVE_INFINITY;
  let cur = 0;
  for (let item of nums) {
    cur += item;
    if (max < cur) {
      max = cur;
    }
    if (cur < 0) {
      cur = 0;
    }
  }
  return max
}

const arr = [-1];

console.log(soln(arr));
