function solution(arr, i, target, sum, final) {
  if (i >= arr.length || sum === target) {
    if (target === sum) {
      console.log(target, sum, '<<<<<<<<')
      console.log(final);
    }
    return;
  }

  if (sum * arr[i] <= target) {
    final.push(arr[i]);
    solution(arr, i, target, sum * arr[i], final);
    final.pop();
  }

  solution(arr, i + 1, target, sum, final);
}

console.log(solution([3, 2, 5, 6], 0, 30, 1, []));
