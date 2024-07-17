function soln(arr) {
  let max = Number.MIN_VALUE;
  let cur = 0;
  for (let item of arr) {
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

const arr = [1, 2, 7, -4, 3, 2, -10, 9, 1];

console.log(soln(arr));
