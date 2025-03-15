// Longest Substring Without Repeating Characters
//you were able to solve just understand the second algo or just see this sum algo
var lengthOfLongestSubstring = function (s) {
  let l = 0;
  let r = 0;
  let max = 0;
  const obj = {};
  while (r < s.length) {
    const cur = s[r];

    if (obj[cur] !== undefined && obj[cur] > 1) {
      l = obj[cur] + 1;
    }

    obj[cur] = r;

    max = Math.max(max, r - l + 1);

    r += 1;
  }
  console.log(obj);
};

const str = "abcabcbb";
//   console.log(lengthOfLongestSubstring(str));

//Max Consecutive Ones III
//you were able to solve just understand the second algo
var longestOnes = function (nums, k) {
  let count = k;
  let l = 0;
  let r = 0;
  let max = 0;
  while (r < nums.length) {
    const cur = nums[r];

    if (cur === 0) {
      count -= 1;
    }

    if (count < 0) {
      if (nums[l] === 0) {
        count += 1;
      }
      l += 1;
    }

    if (count >= 0) {
      max = Math.max(max, r - l + 1);
    }
    r += 1;
  }

  return max;
};

const nums = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1];

console.log(longestOnes(nums, 3));

//Fruit Into Baskets
//you were able to solve just understand the second algo
var totalFruit = function (nums) {
  let l = 0;
  let r = 0;
  let max = 0;
  let b1 = [];
  let b2 = [];

  while (r < nums.length) {
    const cur = nums[r];
    if (b1.length === 0) {
      b1 = [cur, r];
    } else if (b1[0] === cur) {
      b1[1] = r;
    } else if (b2.length === 0) {
      b2 = [cur, r];
    } else if (b2[0] === cur) {
      b2[1] = r;
    } else {
      if (b1[1] > b2[1]) {
        l = b2[1] + 1;
      } else {
        l = b1[1] + 1;
        b1 = b2;
      }

      b2 = [cur, r];
    }

    max = Math.max(max, r - l + 1);

    r += 1;
  }

  return max;
};

//Longest repeating character replacement
//this was easy just figure out drawable solution

//Binary subarray with sum
//this is done by third algo where you find the subarray less than equal to goal and then find subarray which is less than equal to goal - 1 and return the difference
//video from 4:46

var numSubarraysWithSum = function (nums, goal) {
  const lessThanEqualtoGoal = numSubarrayWithLessEqualSum(nums, goal);
  console.log(lessThanEqualtoGoal);
  const lessThanEqualToGoalMinusOne = numSubarrayWithLessEqualSum(
    nums,
    goal - 1
  );
  return lessThanEqualtoGoal - lessThanEqualToGoalMinusOne;
};

const numSubarrayWithLessEqualSum = function (nums, goal) {
  if (goal < 0) return 0;
  let l = 0;
  let r = 0;
  let count = 0;
  let sum = 0;
  while (r < nums.length) {
    const cur = nums[r];
    sum += cur;
    while (sum > goal) {
      sum -= nums[l];
      l += 1;
    }
    count += r - l + 1;
    r += 1;
  }

  return count;
};

const arr = [0, 0, 0, 0, 0];
const goal = 0;

// console.log(numSubarraysWithSum(arr, goal));

//Count number of nice subarrays
/*
problem is exactly like above replace odd with 1 and event with 0

Number of substring containing all three characters

There is one problem that come from intuition which you figure out yourself

This one is the optimal solution which is better solution

this you were able to solve but check striver solution one time
*/

var numberOfSubstrings = function (s) {
  let r = 0;
  let lastSeen = {};
  let count = 0;
  while (r < s.length) {
    const cur = s[r];
    lastSeen[cur] = r;

    if (Object.keys(lastSeen).length === 3) {
      count += 1 + Math.min(lastSeen.a, lastSeen.b, lastSeen.c);
    }

    r += 1;
  }
  return count;
};

const str2 = "aaacb";

// console.log(numberOfSubstrings(str));


//Maximum point you can obtain from cards
//was able to do yourself
var maxScore = function (cardPoints, k) {
  let l = 0;
  let r = cardPoints.length - 1;
  let max = 0;

  while (l < k) {
    max += cardPoints[l];
    l += 1;
  }

  l -= 1;
  let curSum = max;

  while (l >= 0) {
    curSum = curSum + cardPoints[r] - cardPoints[l];
    max = Math.max(curSum, max);

    r -= 1;
    l -= 1;
  }

  return max;
};

const cards = [9, 7, 7, 9, 7, 7, 9];
const k = 7;
console.log(maxScore(cards, k));


