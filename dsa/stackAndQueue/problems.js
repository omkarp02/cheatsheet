//Next Greater Element
//this is easy but understand the question
// input : 5 3 1 2 4 6
// output: 6 4 2 4 6 -1

// so in output give the next greater number of that element

function nextGreaterElement(nums) {
  const stack = [];
  for (let i = nums.length - 1; i >= 0; i--) {
    const cur = nums[i];
    if (stack.length === 0) {
      nums[i] = -1;
      stack.push(cur);
    } else {
      while (cur >= stack[stack.length - 1]) {
        stack.pop();
      }
      nums[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
      stack.push(cur);
    }
  }

  return nums;
}

const arr1 = [5, 3, 1, 2, 4, 6];

// console.log(nextGreaterElement(arr1))

//This you will solve yourself don't code just draw
// Next Greater Element 2

function nextGreaterElement2(nums) {
  const length = nums.length * 2;

  const stack = [];

  for (let i = length - 1; i >= 0; i--) {
    if (i > nums.length - 1) {
      const curIndex = i % nums.length;
      const cur = nums[curIndex];
      if (stack.length === 0) {
        stack.push(cur);
      } else {
        while (cur > stack[stack.length - 1]) {
          stack.pop();
        }
        stack.push(cur);
      }
    } else {
      const cur = nums[i];
      if (stack.length === 0) {
        nums[i] = -1;
        stack.push(cur);
      } else {
        while (cur >= stack[stack.length - 1]) {
          stack.pop();
        }
        nums[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
        stack.push(cur);
      }
    }
  }

  return nums;
}

const arr2 = [2, 10, 12, 1, 11];
// console.log(nextGreaterElement2(arr2));

//Next Smaller Element
function nextSmallerElement(nums) {
  const stack = [];
  const ans = [];
  const length = nums.length;
  for (let i = length - 1; i >= 0; i--) {
    if (stack.length === 0) {
      ans[i] = length;
    } else if (nums[i] > nums[stack[stack.length - 1]]) {
      ans[i] = stack[stack.length - 1];
    } else {
      while (nums[i] < nums[stack[stack.length - 1]]) {
        stack.pop();
      }
      if (stack.length === 0) {
        ans[i] = length;
      } else {
        ans[i] = stack[stack.length - 1];
      }
    }
    stack.push(i);
  }
  return ans;
}

const arr3 = [2, 1, 5, 6, 2, 3];
// console.log(nextSmallerElement(arr3));

//Previous Smaller Element
function prevSmallerElement(nums) {
  const stack = [];
  const ans = [];
  const length = nums.length;
  for (let i = 0; i < length; i++) {
    if (stack.length === 0) {
      ans[i] = -1;
    } else if (nums[i] > nums[stack[stack.length - 1]]) {
      ans[i] = stack[stack.length - 1];
    } else {
      while (nums[i] < nums[stack[stack.length - 1]]) {
        stack.pop();
      }
      if (stack.length === 0) {
        ans[i] = -1;
      } else {
        ans[i] = stack[stack.length - 1];
      }
    }
    stack.push(i);
  }
  return ans;
}

const arr4 = [2, 1, 5, 6, 2, 3];
// console.log(prevSmallerElement(arr4));

// console.log(prevSmallerElement(arr4));

//Next Smaller Element this is similar to next greater element did'nt do it

//Sum of subarray minimum
//Sum of subarray ranges
//Brute force n2
//This did not understand


// Aestroid Collisions
//This you were able to figure out by monotonic stack algo start from back

var asteroidCollision = function (asteroids) {
  const ans = []
  const stack = []
  for (let i = asteroids.length - 1; i <= 0; i++) {
      const cur = asteroids[i]

      if (cur < 0) {
          stack.push(asteroids[i])
      } else if (stack.length === 0) {
          ans.push(asteroids[i])
      } else {
          while (cur > Math.abs(stack[stack.length - 1])) {
              stack.pop()
          }
          if (cur === Math.abs(stack[stack.length - 1])) {
              stack.pop()
          }
          else if (stack.length === 0) {
              ans.push(asteroids[i])
          }
      }
      stack.push(asteroids[i])
  }

};

const asteroids = [4, 7, 1, 1, 2, -3, -7, 17, 15, -16]

//remove kth digit try this yourself don't try to apply nge
//just stack push element from start in stack and compare with existing elemen in stack
//intuition is that smallest element should be at start

var removeKdigits = function (str, k) {

  if (str.length === k) return '0'

  let removeNo = k
  const stack = []
  for (let i = 0; i < str.length; i++) {
    const cur = str[i]
    if (stack.length === 0) {
      stack.push(cur)
    } else if (cur > stack[stack.length]) {
      stack.push(cur)
    } else {
      while (cur < stack[stack.length - 1] && stack.length > 0 && removeNo > 0) {
        stack.pop()
        removeNo -= 1
      }
      stack.push(cur)
    }
  }
  while (removeNo > 0) {
    stack.pop()
    removeNo -= 1
  }


  let newStr = 0

  //this is solved but here it is not able to convert like big number to string because it gives infinity
  for (let item of stack) {
    newStr = (newStr * 10) + +item
  }

  return newStr.toString()
}

const str = "1432219"
const k = 3

// console.log(removeKdigits(str, k))

//Largest rectangle in a histogram
//bruteforce go to every index and find the left smallest and rirght smallest
//Better get prevsmallestelement and nextsmallestelement and use formula arr[i] * (next - prev - 1)
//Optimal try doing this pse and nse on the go so you will do pse and when you like found a bigger element can we can consider is as nse
//like the array is 3 2 you go to 3 make it as -1 you go to 2 now see in stack you find 3 now you pop 3 becuase it is greater but when you pop you find out that 2 is smaller than 3 means 2 is next smaller element of 3 so this way you are doing nse and pse both

function largestRectangleInHistogram(nums) {
  const stack = [];
  const length = nums.length;
  let max = 0;
  for (let i = 0; i < length; i++) {
    if (stack.length === 0) {
      stack.push(i);
    } else if (nums[i] > nums[stack[stack.length - 1]]) {
      stack.push(i);
    } else {
      while (nums[stack[stack.length - 1]] > nums[i]) {
        const cur = stack.pop();
        let prevSmallest = stack.length === 0 ? -1 : stack[stack.length - 1];
        max = Math.max(max, nums[cur] * (i - prevSmallest - 1));
      }
      stack.push(i);

    }
  }
  return max
}

const nums2 =[2, 1, 5, 6, 2, 3]
console.log(largestRectangleInHistogram(nums))

//Largest rectangle in a histogram
//bruteforce go to every index and find the left smallest and rirght smallest
//Better get prevsmallestelement and nextsmallestelement and use formula arr[i] * (next - prev - 1)
//Optimal try doing this pse and nse on the go so you will do pse and when you like found a bigger element can we can consider is as nse
//like the array is 3 2 you go to 3 make it as -1 you go to 2 now see in stack you find 3 now you pop 3 becuase it is greater but when you pop you find out that 2 is smaller than 3 means 2 is next smaller element of 3 so this way you are doing nse and pse both

function largestRectangleInHistogram(nums) {
  const stack = [];
  const length = nums.length;
  let max = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < length; i++) {
    if (stack.length === 0) {
      stack.push(i);
    } else if (nums[i] > nums[stack[stack.length - 1]]) {
      stack.push(i);
    } else {
      while (nums[stack[stack.length - 1]] > nums[i]) {
        const cur = stack.pop();
        let prevSmallest = stack.length === 0 ? -1 : stack[stack.length - 1];
        max = Math.max(max, nums[cur] * (i - prevSmallest - 1));
      }
      stack.push(i);
    }
  }
  return max === Number.NEGATIVE_INFINITY ? nums[stack[stack.length - 1]] : max;
}

const nums = [1, 1];
console.log(largestRectangleInHistogram(nums));

//   Maximal Rectangles
// This can be done with help of above quesiton
//just image histogram on each row

//Sliding Window maximum
//was easy 

// Stock Span Problem
//was easy

//celibrity problem
//understand the question and do it yourself

//lru can be done using doubly linked list and hash map
