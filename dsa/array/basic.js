//find the kth largest element use priority queue or max heap to solve this problem

//move all negative element to right side of the array

function moveAllNegativeElement(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    if (arr[start] === -1) {
      start++;
    } else {
      swap(start, end, arr);
      end--;
    }
  }
  return arr;
}

const arr1 = [1, -1, 1, 1, -1, -1, 1, 1];

// console.log(moveAllNegativeElement(arr1));

//find union intersection of two sorted array  this can be done using set

//write a program to cyclic rotate an array
/*
Intuition 

1. pop and unshift
2. use reverese


*/

//this is reverse one with o(n) time complexity

const arr2 = ["a", "b", "c", "d", "e", "f", "g"];

function rotateArrayByK(arr, k) {}

//minimum number of jump to reach end of an array
/*
    1. This can be done using recursion and dp check dp folder 1D
    2. This is another method lets see this

*/

function minNumberOfJumps(arr) {
  let steps = 1;
  let reach = 0;
  let max = arr[0];

  if (arr[0] >= arr.length - 1) {
    return 1;
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[reach] === i) {
      steps += 1;
      reach = max;
    }

    if (max < arr[reach] + arr[i]) {
      max = arr[reach] + arr[i];
    }
  }
  return steps;
}

const arr3 = [1, 2];

// console.log(minNumberOfJumps(arr3));

/* 

find duplicate number

*/

function duplicateNumer(arr) {
  let sum = 0;
  let tempSum = 0;
  let count = 0;

  for (let item of arr) {
    tempSum += count;
    count += 1;
    sum += item;
  }

  return sum - tempSum;
}

const arr4 = [1, 3, 4, 2, 4];

// console.log(duplicateNumer(arr4))

function swap(first, second, arr) {
  let temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
}

//--------------------------------------------------------------------------

//combination sum

/*
  Input: candidates = [2,3,6,7], target = 7
  Output: [[2,2,3],[7]]
  Explanation:
  2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
  7 is a candidate, and 7 = 7.
  These are the only two combinations.


*/

function combinationSum(nums, i, final, target, ans) {
  if (i === nums.length) {
    if (target === 0) {
      ans.push([...final]);
    }
    return;
  }

  if (nums[i] <= target) {
    final.push(nums[i]);
    combinationSum(nums, i, final, target - nums[i], ans);
    final.pop();
  }
  combinationSum(nums, i + 1, final, target, ans);
  return;
}

const arr5 = [2, 3, 6, 7];

const ans = [];
// combinationSum(arr5, 0, [], 7, ans);
// console.log(ans);

/*
  combination sum 2
  1. This problem can be basically solved by using combination sum 
  2.This can be done in more optimize way but I did'nt get the inituition so did'nt do it

*/

function combinationSum2(nums, i, final, target, ans) {
  if (i === nums.length) {
    if (target === 0) {
      ans.push([...final]);
    }
    return;
  }

  if (nums[i] <= target) {
    final.push(nums[i]);
    combinationSum2(nums, i + 1, final, target - nums[i], ans);
    final.pop();
  }
  combinationSum2(nums, i + 1, final, target, ans);
  return;
}

const arr6 = [10, 1, 2, 7, 6, 1, 5];

const ans2 = [];
// combinationSum2(arr6, 0, [], 8, ans2);
// console.log(ans2);

//subset sum

function subsetsum(nums, i, sum) {
  if (i === nums.length) {
    console.log(sum);
    return;
  }

  sum += nums[i];
  subsetsum(nums, i + 1, sum);
  sum -= nums[i];
  subsetsum(nums, i + 1, sum);
}

const arr7 = [3, 1, 2];

// console.log(subsetsum(arr7, 0, 0));

//print all subset no duplicate are allowed
//1. this can be solved using set but there is optimized version check take u forward sub set 2 video

function subsetNoDup(nums, i, final, result) {
  if (i === nums.length) {
    result.push([...final]);
    return;
  }

  final.push(nums[i]);
  subsetNoDup(nums, i + 1, final, result);
  final.pop(nums[i]);
  subsetNoDup(nums, i + 1, final, result);
}
const arr8 = [1, 2, 2];
const ans3 = [];
// subsetNoDup(arr8, 0, [], ans3);
// console.log(ans3);

//find all pairs on integer array whose sum is equal to given number

function findAllPairEqualToSum(nums, target) {
  const obj = {};
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (obj[diff] !== undefined) {
      result.push([obj[diff], i]);
    }
    obj[nums[i]] = i;
  }
  return result;
}

const arr9 = [1, 2, 3];
// console.log(findAllPairEqualToSum(arr9, 4));

//find common element in three sorted array

/*
  1. check if i === j === k
  2. if i < j i++
  3, if j < k j++
  4. else k++

*/

function findCommonElementInThreeSortedArray(nums1, nums2, nums3) {
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < nums1.length && j < nums2.length && k < nums3.length) {
    const first = nums1[i];
    const second = nums2[j];
    const third = nums3[k];
    if (first === second && second === third) {
      console.log(first)
      i++;
      j++;
      k++;
    } else if (first < second) {
      i++;
    } else if (second < third) {
      j++;
    } else {
      k++;
    }
  }

  
}

const arr10 = [1, 5, 10, 20, 40, 80];
const arr11 = [6, 7, 20, 80, 100];
const arr12 = [3, 4, 15, 20, 30, 70, 80, 120];
console.log(findCommonElementInThreeSortedArray(arr10, arr11, arr12));
