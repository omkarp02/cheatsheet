function soln(arr, target) {
  const obj = {};
  let max = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (obj[sum - target] !== undefined) {
      max = Math.max(i - obj[sum - target], max);
    }
    if(obj[sum] === undefined){
      obj[sum] = i;
    }
  }
console.log(obj)
  return max;
}

console.log(soln([2, 0, 0, 3], 3));
