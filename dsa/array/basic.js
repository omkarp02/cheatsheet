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

  return  sum - tempSum;
}

const arr4 = [1, 3, 4, 2, 4];

// console.log(duplicateNumer(arr4))

function swap(first, second, arr) {
  let temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
}
