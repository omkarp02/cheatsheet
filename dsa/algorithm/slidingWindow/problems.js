/*

maximum point you can obtain from cards

this problem is solved by using constant window algo

*/

const arr = [1, 2, 3, 4, 5, 6, 1];
const k = 3;

var maxScore = function (cardPoints, k) {
  let sum = 0;
  let max = Number.MIN_VALUE;
  let i = k - 1;
  let j = cardPoints.length - 1;

  for (let m = 0; m <= i; m++) {
    sum += cardPoints[m];
  }

  max = sum;

  while (i >= 0) {
    sum -= cardPoints[i];
    sum += cardPoints[j];
    j--;
    i--;

    if (max < sum) {
      max = sum;
    }
  }

  return max;
};

// console.log(maxScore(arr, k));

/*

    Longest substring without repeating character
    This problem can be solved using shrink and expand algo

*/

var lengthOfLongestSubstring = function (s) {
  let l = 0;
  let r = 0;
  let max = 0;
  const obj = {};

  while (r < s.length) {
    const cur = s[r];

    if (obj[cur] !== undefined && obj[cur] >= l) {
      l = obj[cur] + 1;
    }

    obj[cur] = r;

    max = Math.max(max, r - l + 1);
    r += 1;
  }

  return max;
};

const str = "abcabcbb";
// console.log(lengthOfLongestSubstring(str));

//Better Solution
var longestOnesBetter = function (nums, k) {
  let max = 0;
  let noOfZero = 0;
  let r = 0;
  let l = 0;

  while (r < nums.length) {
    if (nums[r] === 0) noOfZero += 1;
    while (noOfZero > k) {
      if (nums[l] === 0) {
        noOfZero -= 1;
      }
      l += 1;
    }

    max = Math.max(max, r - l + 1);
    r += 1;
  }
  return max;
};

var longestOnesOptimal = function (nums, k) {
  let max = 0;
  let noOfZero = 0;
  let r = 0;
  let l = 0;

  while (r < nums.length) {
    if (nums[r] === 0) noOfZero += 1;

    if (noOfZero > k) {
      if (nums[l] === 0) noOfZero -= 1;
      l += 1;
    }

    if (noOfZero <= k) {
      max = Math.max(max, r - l + 1);
    }

    r += 1;
  }

  return max;
};

const arr2 = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0];
const k2 = 2;

// console.log(longestOnesOptimal(arr2, k2));

/*
    fruit into the basket

*/

// *! this is not solved by me but I know how to solve it
//maintain a map of the element and the element count means number of time it apper when condition start moving l forward and decreasing the count of that element in array till it satify the condition
var totalFruit = function (fruits) {
  let baskets = [
      [-1, 0],
      [-1, 0],
    ],
    max = 1;

  let start = 0,
    end = 0;
  while (end < fruits.length) {
    /* Try to add it to a basket. */
    if (fruits[end] === baskets[0][0]) baskets[0][1]++;
    else if (fruits[end] === baskets[1][0]) baskets[1][1]++;
    else if (baskets[0][0] === -1) {
      baskets[0][0] = fruits[end];
      baskets[0][1] = 1;
    } else if (baskets[1][0] === -1) {
      baskets[1][0] = fruits[end];
      baskets[1][1] = 1;
    } else {
      /* Roll up the left side of the window. */
      while (baskets[0][1] > 0 && baskets[1][1] > 0) {
        let ind = 0;
        if (baskets[1][0] === fruits[start]) ind = 1;
        if (baskets[ind][1] === 1) baskets[ind][0] = -1;
        baskets[ind][1]--;
        start++;
      }
      continue;
    }
    max = Math.max(max, baskets[0][1] + baskets[1][1]);
    end++;
  }

  return max;
};

const arr3 = [3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4];
const k3 = 2;

// console.log(totalFruit(arr3));

//Number of Substrings Containing All Three Characters
//you did this yourself based on the past problems

var numberOfSubstrings = function (s) {
  let l = 0;
  let r = 0;
  let max = 0;
  let count = 0;
  const map = {};
  while (r < s.length) {
    const cur = s[r];
    map[cur] = map[cur] ? map[cur] + 1 : 1;
    max = count + max;
    while (Object.keys(map).length === 3) {
      const leftValue = s[l];
      count += 1;
      max += 1;
      map[leftValue] -= 1;
      if (map[leftValue] === 0) {
        delete map[leftValue];
      }
      l += 1;
    }

    r += 1;
  }
  return max
};

const str1 = "abc";
console.log(numberOfSubstrings(str1));

/*
Subarray with k different integers 
for this problem we use another algo check the video striver sliding window 11 video

*/
