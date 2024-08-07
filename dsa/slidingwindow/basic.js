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

