//find the kth largest element use priority queue or max heap to solve this problem

//Move all the negative elements to one side of the array

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

/*
  Find missing number in an array
  If number range from 1 to n than it can be cyclic 
  If there is no duplication this can be done by sum method
  xor method  see this in bit manipulation 

*/
function findMissingNumberInArray(nums) {}

const arr19 = [1, 2, 3, 5];
console.log(findMissingNumberInArray(arr19));

//Find the number that appears once, and other numbers twice.
//This can also be solved by bit manupulation and hashing the hashing one figure out yourself

// console.log(moveAllNegativeElement(arr1));

//Find the Union and Intersection of the two sorted arrays
//this can be done using set and two pointer

//Write a program to cyclically rotate an array by one
/*
Intuition 

1. pop and unshift
2. use reverese


*/

//this is reverse one with o(n) time complexity

const arr2 = ["a", "b", "c", "d", "e", "f", "g"];

function rotateArrayByK(arr, k) {}

//Minimum no. of Jumps to reach end of an array
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

//Find duplicate in an array of N+1 Integers
//For this problem check the cylic sort alogrithm

//Given an array which consists of only 0, 1 and 2. Sort the array without using any sorting algo

const sortColors = function (nums) {
  let start = 0;
  let mid = 0;
  let end = nums.length - 1;
  while (mid <= end) {
    if (nums[mid] === 0) {
      swap(start, mid, nums);
      mid++;
      start++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      swap(end, mid, nums);
      end--;
    }
  }

  return nums;
};

const nums = [2, 0, 1];

// console.log(sortColors(nums));

//Merge 2 sorted arrays without using Extra space.

function mergeTwoSortedArray(nums1, nums2) {
  let i = 0;
  let j = nums1.length - 1;
  let k = 0;

  while (i < j) {
    if (nums1[i] > nums2[k]) {
      swapInTwoArray(j, k, nums1, nums2);
      j--;
      k++;
    } else {
      i++;
    }
  }

  nums1.sort();
  nums2.sort();

  return { nums1, nums2 };
}

const arr13 = [1, 3, 5, 7];
const arr14 = [0, 2, 6, 8, 9];

// console.log(mergeTwoSortedArray(arr6, arr7));

//Merge Interval
//this one don't try

const merge = function (intervals) {
  let overlap = intervals[0];
  const ans = [];

  for (let i = 0; i < intervals.length; i++) {
    const cur = intervals[i];
    if (overlap[1] >= cur[0] && overlap[1] <= cur[1]) {
      overlap = [overlap[0], cur[1]];
    } else {
      ans.push(overlap);
      overlap = cur;
    }
  }
  return ans;
};

const arr15 = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];

// console.log(merge(arr8));

//next permutation
/*
  here there is one thing to note how to do this like
  if it is like this bc/a than it will be abc bac bca
  so how to put this a proper
  find out the first and last part of a and put a in middle
*/

function nextPermutation(nums) {
  permutationHlp([], nums);
}

function permutationHlp(process, unProccess) {
  if (unProccess.length === 0) {
    console.log(process);
    return;
  }

  const digit = unProccess.pop();
  const processLength = process.length;
  for (let i = 0; i <= processLength; i++) {
    const f = process.slice(0, i);
    const l = process.slice(i, processLength);
    permutationHlp(
      [...f, digit, ...l],
      unProccess.slice(0, unProccess.length - processLength + 1)
    );
  }
}

const arr16 = [1, 2, 3];

// nextPermutation(arr9);

//count inversion this question you can find solved in merge sort section

//--------------------------------------------------------------------------

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

// Two sum
//this can be done using hash you reached till here yourself
//next sort the array and find the target using two pointer approach

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
      console.log(first);
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
// console.log(findCommonElementInThreeSortedArray(arr10, arr11, arr12));

//Rearrange the array in alternating positive and negative items
//bruteforce keep two array postive and negative then merge
//this can be done with n space complexity

//Find if there is any subarray with sum equal to 0
/*
  Intuition
  1 -1 3 2 -2 -8 1 7 10 23

  so index 0 to 2 have submission of 3 which we stored in hashmap
  and index 0 to 4 also gave submission of 3 which means that from 3 to 4 the submission whas 0 that is the reason you get 3 again

   3   0
  --- --
  012 34
  ------
     3
  */

function largestSubArrayWithZeroSum(nums) {
  const map = {};
  let sum = 0;
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    if (sum === 0) {
      max = Math.max(max, i + 1);
    } else if (map[sum]) {
      max = Math.max(max, i + 1 - (map[sum] + 1));
    } else {
      map[sum] = i;
    }
  }
  return max;
}

const arr17 = [1, -1, 3, 2, -2, -8, 1, 7, 10, 23];

// console.log(largestSubArrayWithZeroSum(arr17));

//Replace Elements with Greatest Element on Right Side
var replaceElements = function (arr) {
  let max = -1;
  for (let i = arr.length - 1; i >= 0; i--) {
    let curMax = max;
    max = Math.max(curMax, arr[i]);
    arr[i] = curMax;
  }
  return arr;
};

const arr20 = [17, 18, 5, 4, 6, 1];
console.log(replaceElements(arr20));

//Find factorial of a large number
/*
  largest factorial can't be stored in any datatypep so it must be stored in array like factorial of 5 is [1, 2, 0]

*/

//find maximum product subarray
/*
  This has a very great intuition check the striver video
  Try doing it yourself
  you were able to do it yourself but check stiver video once
  this can be done in o(n)
*/
function subArrayWithMaximumProduct(nums) {
  let pre = 1;
  let suff = 1;
  let ans = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < nums.length; i++) {
    if (pre === 0) pre = 1;
    if (suff === 0) suff = 1;

    pre *= nums[i];
    suff *= nums[nums.length - i - 1];

    ans = Math.max(ans, Math.max(pre, suff));
  }

  return ans;
}

const arr = [3, 2, -1, 4, -6, 3, -2, 6];
// console.log(subArrayWithMaximumProduct(arr))

//Find longest consecutive subsequence
/*
  For this optimal solution you were not able to find the intuition
  use set see this time you are able to find out
  sort the array
*/

var longestConsecutive = function (nums) {
  let max = 0;
  let count = 0;

  const set = new Set(nums);

  for (let i = 0; i < nums.length; i++) {
    const prev = nums[i] - 1;
    if (!set.has(prev)) {
      let cur = nums[i];
      while (set.has(cur)) {
        cur += 1;
        count++;
      }
      max = Math.max(max, count);
      count = 0;
    }
  }
  return max;
};

const arr18 = [102, 4, 100, 1, 101, 3, 2];

// console.log(longestConsecutive(arr18))


//find Largest sum contiguous Subarray
// Count Subarray sum Equals K
function countSubarraySum(nums, k) {
  let cursum = 0;
  let map = {};
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    cursum += nums[i];

    if (cursum - k === 0) {
      result.push([0, i]);
    }

    if (map[cursum - k] !== undefined) {
      result.push([map[cursum - k] + 1, i]);
    }

    map[cursum] = i;
  }

  return result;
}

const arr21 = [1, 2, 3, -3, 1, 1, 1, 4, 2, -3];

// console.log(countSubarraySum(arr21, 3));

//Given an array of size n and a number k, find all elements that appear more than " n/k " times
/*
  Majority Element I 
  Better => can be solved by hashmap
  Optimized => can be solved by moore's voting algo check solution in algo folder arr

  Majority Element II
  Better => can be solved by hasmap
  Optimized => moore's voting algo 
  This optimized I have not solved this you try to solve or you can memerize

*/

//Find whether an array is a subset of another array
/*  This was very easy so did'nt solved it */

//Find the triplet that sum to a given value This is 3sum and 2sum

//2sum
/*
  better solution by hashing
  optimal sort and two pointer

*/

//3sum
/*
  this you can solve if you solve 2sum try doing it your self
  better solution by hashing
  optimal sort and two pointer
*/

/*
  Trapping Rain water problem 
  this has a complex logic and intuition see the striver video for it

*/

/*
  Chocolate Distribution problem
  This first understand the problem and try doing yourself 
  video to watch shashcode  channel
*/

/*
  Smallest Subarray with sum greater than a given value 
  This can be solved with sliding window very easily first see striver sliding window question
  */

/*
Three way partitioning of an array around a given value
  This can be done using 3 pointer try to solve yourself you will find the solution
  

  solution l,i, r
  l will always take care of left and r will do the same
  i will increase for every loop and check the element it is one and swap with l and r accordingly

*/

/*

Minimum swaps required bring elements less equal K together

My approach is iterate and find all the element together like 
2 1 5 6 3 where k = 3

INtuituion count the elment less than 3 and apply the sliding window so number of element less than 3 is 3 now make a window of size 3 and staring counting not favorual elemnent which are the answer

what shashcode video

*/

//------------------------------------------------------------------------------------------------------- helpers
function swap(first, second, arr) {
  let temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
}

function swapInTwoArray(first, second, arr1, arr2) {
  let temp = arr1[first];
  arr1[first] = arr2[second];
  arr2[second] = temp;
}
