

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

function firstAndLastPosition(nums, target) {}

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

//here is s = m = e trim down the search place because this is making you the problem to identify which side to trim
/*

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
      if(nums[start] < nums[min]){
        min = start
      }
      start = mid + 1;
    } else {
      //this means right hand side is sorted so check in right hand side
      if(nums[mid] < nums[min]){
        min = mid
      }
      end = mid - 1;
    }
  }
  return nums[min]
};

const arr6 = [3, 4, 5, 1, 2];
console.log(minimumInRotatedSortedArray(arr6))
