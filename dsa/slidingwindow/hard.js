// Longest Substring with At Most K Distinct Characters
//this is easy you can do it

//Subarray with k different integers
//this can be done using the 3rd algo of sliding window
var subarraysWithKDistinct = function (nums, k) {
  const a = subarraysWithLessThanEqualKDistinct(nums, k);
  const b = subarraysWithLessThanEqualKDistinct(nums, k - 1);
  return a - b;
};

const subarraysWithLessThanEqualKDistinct = function (nums, k) {
  let l = 0;
  let r = 0;
  const map = {};
  let count = 0;

  while (r < nums.length) {
    const cur = nums[r];

    if (map[cur]) {
      map[cur] += 1;
    } else {
      map[cur] = 1;
    }

    while (Object.keys(map).length > k) {
      map[nums[l]] -= 1;
      if (map[nums[l]] === 0) {
        delete map[nums[l]];
      }
      l += 1;
    }

    if (Object.keys(map).length <= k) {
      count += r - l + 1;
    }

    r += 1;
  }
  return count;
};

const nums = [1, 2, 1, 3, 4];
const k = 3;

//   console.log(subarraysWithKDistinct(nums, k));

//Minimum Window Substring
//for this problem you were able to figure out better
//optimal finding out if abc is there so create map of abc where a: 1, b: 1, c: 1 is predefined and as you start find the element like you find d like d is not present so you make it -1 again find d so d = -2 and find a then a = 0 when some one is zero mean they were pre defined so increase count to 1 so when the count is equal to the abc lenght which is 3 you added it in min assumptions you can also see the video try doing yourself watch video from 11:40

