let cnt = 0;
function soln(arr, start, end) {
  if (start === end) {
    return;
  }

  let mid = Math.floor((start + end) / 2);
  soln(arr, start, mid);
  soln(arr, mid + 1, end);
  mergeTwoArray(start, mid, mid + 1, end, arr);
}

function mergeTwoArray(start1, end1, start2, end2, arr) {
  const result = [];
  const start = start1;
  const end = end2;

  while (start1 <= end1 && start2 <= end2) {
    if (arr[start1] <= arr[start2]) {
      result.push(arr[start1]);
      start1++;
    } else {
        cnt += end1 - start1 + 1;
      result.push(arr[start2]);
      start2++;
    }
  }

  while (start1 <= end1) {
    result.push(arr[start1]);
    start1++;
  }

  while (start2 <= end2) {
    result.push(arr[start2]);
    start2++;
  }

  let count = 0;
  for (let index = start; index <= end; index++) {
    arr[index] = result[count];
    count++;
  }
}

const arr = [5, 3, 2, 4, 1];
console.log(soln(arr, 0, arr.length - 1));
console.log(arr)
console.log(cnt)
