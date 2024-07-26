function mergeSort(start, end, nums) {
  if (start === end) {
    return;
  }

  const middle = Math.floor((start + end) / 2);

  mergeSort(start, middle, nums);
  mergeSort(middle + 1, end, nums);
  mergeSortHlp(start, middle, middle + 1, end, nums);
}

function mergeSortHlp(start1, end1, start2, end2, nums) {
  const arr = [];
  const start = start1;
  const end = end2;

  while (start1 <= end1 && start2 <= end2) {
    if (nums[start1] < nums[start2]) {
      arr.push(nums[start1]);
      start1++;
    } else {
      arr.push(nums[start2]);
      start2++;
    }
  }

  while (start1 <= end1) {
    arr.push(nums[start1]);
    start1++;
  }

  while (start2 <= end2) {
    arr.push(nums[start2]);
    start2++;
  }

  let count = 0;
  for (let index = start; index <= end; index++) {
    nums[index] = arr[count];
    count++;
  }
}

const arr = [8, 3, 4, 12, 5, 6, 2];

console.log(mergeSort(0, arr.length - 1, arr));

console.log(arr);

function swap(first, second, arr) {
  let temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
}
