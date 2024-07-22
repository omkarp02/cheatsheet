/*
  cyclic sort
  check if current index have correct number like here
  3 2 1 4 5 
  so 1 index should have 1 but it have 3 so move 3 to correct index


  Problem it solves

  Find duplicate in an array of N+1 Integers

*/

import { swap } from "./helper.js";

function cyclicSort(nums) {
  let i = 0;
  while (i < nums.length) {
    const elementOnCurrentIndex = nums[i];
    const validElement = i + 1;
    if (elementOnCurrentIndex === validElement) {
      i++;
    } else if (nums[elementOnCurrentIndex - 1] !== elementOnCurrentIndex) {
      swap(i, elementOnCurrentIndex - 1, nums);
    } else {
      i++;
    }
  }
  return nums;
}

const arr5 = [3, 1, 3, 4, 2];
console.log(cyclicSort(arr5));

