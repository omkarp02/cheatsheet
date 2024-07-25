//Binary Search to find X in sorted array
function binarySearch(nums, target) {
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = Math.floor((high + low) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return low;
}

const arr = [3, 4, 6, 7, 9, 12, 16, 17];
// console.log(binarySearch(arr, 12))

//Implement Upper Bound and Lower Bound
//This might be the possible answer is the key
function binarySearchUpperBound(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  let ans = 0;
  while (low <= high) {
    const mid = Math.floor((high + low) / 2);
    if (nums[mid] <= target) {
      ans = mid;
      high -= 1;
    } else {
      low += 1;
    }
  }
}

function binarySearchLowerBound(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  let ans = 0;
  while (low <= high) {
    const mid = Math.floor((high + low) / 2);
    if (nums[mid] >= target) {
      ans = mid;
      low += 1;
    } else {
      high -= 1;
    }
  }
}

let arr2 = [3, 5, 8, 9, 15, 19];
let n2 = 6,
  x2 = 9;
// let ind2 = upperBound(arr, x, n);
// console.log("The upper bound is the index:", ind);

//Find first and last positions of an element in a sorted array
//find the lower bound and upper bound of target and you find the first and last position
/*
Here is another great solution try to solve this using binary search yourself
Here you do a binary search and if you find element equal to target than if you want to find the first occurance you apply binary search on the left side of the arr
*/

//Count occurrences of a number in a sorted array with duplicates
var searchRange = function (nums, target) {
  const fs = binarySearchFirstLastOccurnace(nums, target, true);
  const lt = binarySearchFirstLastOccurnace(nums, target, false);
  return [fs, lt];
};

const binarySearchFirstLastOccurnace = (nums, target, firstOccurance) => {
  let low = 0;
  let high = nums.length - 1;
  let ans = -1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (nums[mid] < target) {
      low = mid + 1;
    } else if (nums[mid] > target) {
      high = mid - 1;
    } else {
      ans = mid;
      if (firstOccurance) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
  }
  return ans;
};

const arr3 = [5, 7, 7, 7, 7, 8, 8, 10];

// console.log(searchRange(arr3, 7));

//Search in Rotated Sorted Array I
//This is easy use binary search to just element one side by checking mid and start and now solve by yourself
const searchInRotatedSortedArr = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (target === nums[mid]) {
      return mid;
    } else if (nums[mid] <= nums[start]) {
      //here note this equal to sign please very important
      //this means right hand side is sorted so check in right hand side
      if (target >= nums[mid + 1] && target <= nums[end]) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    } else {
      if (target >= nums[start] && target <= nums[mid - 1]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
  }
  return -1;
};

const arr4 = [3, 4, 5, 6, 7, 8, 1, 2];
// console.log(searchInRotatedSortedArr(arr4, 2));

/*
Search in Rotated Sorted Array II

here is s = m = e trim down the search place because this is making you the problem to identify which side to trim

312333

so here from s = 0 and e = 5 it will be s = 1 and e = 4 so again check if s = mid = e if not again trim 

*/
const searchInRotatedDuplicateSortedArr = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (target === nums[mid]) {
      return true;
    } else if (nums[mid] === nums[start] && nums[mid] === nums[end]) {
      start += 1;
      end -= 1;
    } else if (nums[start] <= nums[mid]) {
      //here note this equal to sign please very important
      if (target >= nums[start] && target <= nums[mid - 1]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    } else {
      //this means right hand side is sorted so check in right hand side
      if (target >= nums[mid + 1] && target <= nums[end]) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }
  return false;
};

const arr5 = [2, 2, 2, 3, 1];
// console.log(searchInRotatedDuplicateSortedArr(arr5, 1));

// Find minimum in Rotated Sorted Array
//so here we if find the sorted half and take the smallest from it and than again find the another sorted half and so on
const minimumInRotatedSortedArray = function (nums) {
  let start = 0;
  let end = nums.length - 1;
  let min = 0;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (nums[start] <= nums[mid]) {
      //this mean the left side is sorted
      //here note this equal to sign please very important
      if (nums[start] < nums[min]) {
        min = start;
      }
      start = mid + 1;
    } else {
      //this means right hand side is sorted so check in right hand side
      if (nums[mid] < nums[min]) {
        min = mid;
      }
      end = mid - 1;
    }
  }
  return nums[min];
};

const arr6 = [3, 4, 5, 1, 2];
// console.log(minimumInRotatedSortedArray(arr6));

//Single element in a Sorted Array
// This can be solved I will give you one hint check the index of the every element and see how you can element the left or the right side
function singleNonDuplicate(arr) {
  let n = arr.length; // Size of the array

  // Edge cases:
  if (n === 1) return arr[0];
  if (arr[0] !== arr[1]) return arr[0];
  if (arr[n - 1] !== arr[n - 2]) return arr[n - 1];

  let low = 1,
    high = n - 2;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    // If arr[mid] is the single element:
    if (arr[mid] !== arr[mid + 1] && arr[mid] !== arr[mid - 1]) {
      return arr[mid];
    }

    // We are in the left:
    if (
      (mid % 2 === 1 && arr[mid] === arr[mid - 1]) ||
      (mid % 2 === 0 && arr[mid] === arr[mid + 1])
    ) {
      // Eliminate the left half:
      low = mid + 1;
    }
    // We are in the right:
    else {
      // Eliminate the right half:
      high = mid - 1;
    }
  }

  // Dummy return statement:
  return -1;
}

let arr7 = [1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6];
// console.log(singleNonDuplicate(arr));

//Find peak element
//As this is the peak draw a diagram this will help it is easy
function findPeakElement(arr) {
  let n = arr.length; // Size of the array

  // Edge cases:
  if (n === 1) return 0;
  if (arr[0] > arr[1]) return 0;
  if (arr[n - 1] > arr[n - 2]) return n - 1;

  let low = 1,
    high = n - 2;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    // If arr[mid] is the peak:
    if (arr[mid - 1] < arr[mid] && arr[mid] > arr[mid + 1]) return mid;

    // If we are in the left:
    if (arr[mid] > arr[mid - 1]) low = mid + 1;
    // If we are in the right:
    // Or, arr[mid] is a common point:
    else high = mid - 1;
  }
  // Dummy return statement
  return -1;
}

let arr8 = [1, 2, 3, 4, 5, 6, 7, 8, 5, 1];
// console.log(findPeakElement(arr8));

//Find square root of a number in log n
//so if you want to find the square root of 25
//do binary search from 1 to 25
//main things is to figure out start and end
function findSquareRoot(val) {
  let start = 0;
  let end = val;
  let ans = 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const square = mid * mid;
    if (square <= val) {
      ans = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return ans
}

// console.log(findSquareRoot(25))

function findKRoot(val, k) {
  let start = 0;
  let end = val;
  let ans = 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const square = Math.pow(mid, k);
    if (square <= val) {
      ans = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return ans
}

// console.log(findKRoot(8, 3))

//Koko Eating Bananas
// This was easy like square root problem only like what if k is 1 then 2 then 3 like that and so  on so apply binary search like that only

// Minimum days to make M bouquets
// This one is exactly like square root just need to figure out how to solve this bruteforce intially than figure out how to solve by binary tree always first figure out the start and end and remaining you can do

//Find the smallest Divisor
// This is also same as above just figure out the start and end and it is solved

//Capacity to Ship Packages within D Days
//This is also same as above just figure out the start and end and it is solved

//Kth Missing Positive Number see the bruteforce rest you can solve

// Aggressive Cows no issue if you don't do this the problem is understand the question
