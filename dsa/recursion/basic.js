function reverseAnArray(arr, i, j) {
  if (i >= j) {
    return arr;
  }

  swap(i, j, arr);

  return reverseAnArray(arr, i + 1, j - 1);
}
const arr = [1, 2, 3, 4, 5];
// console.log(reverseAnArray(arr, 0, arr.length - 1));

function checkPalidrome(str, i) {
  if (i === Math.floor(str.length - 1)) {
    return true;
  }

  if (str[i] !== str[str.length - 1 - i]) {
    return false;
  }

  return checkPalidrome(str, i + 1);
}

const str = "toooot";

// console.log(checkPalidrome(str, 0));

// Generate all binary strings
function generateAllBinaryString(str, k) {
  if (str.length === k) {
    console.log(str);
    return;
  }

  generateAllBinaryString(str + "0", k);
  if (str[str.length - 1] !== "1") {
    generateAllBinaryString(str + "1", k);
  }
}

// generateAllBinaryString("", 4);

// Generate Paranthesis
var generateParenthesis = function (n) {
  const result = [];
  generateParenthesisHlp(result, "(", n - 1, n);
  return result;
};

//this whole thing was done by recursion but we could have just generated half string like n = 3 ((( so rest can be added by for loop like (()( as you can see here 3 open bracket are use so rest will be closed only like this so in base conditino instead of add you could use || and add condition in recursion like don't enter if ( open is reached or bracket close is reached

//whole recursion approach
const generateParenthesisHlpRec = (result, str, openNo, closeNo) => {
  if (openNo === 0 && closeNo === 0) {
    result.push(str);
    return;
  }

  const isOpenCompleted = !openNo > 0;
  const isCloseCompleted = !closeNo > 0;

  generateParenthesisHlpRec(
    result,
    `${str} ${isOpenCompleted ? ")" : "("}`,
    isOpenCompleted ? openNo : openNo - 1,
    isOpenCompleted ? closeNo - 1 : closeNo
  );

  if (openNo < closeNo) {
    generateParenthesisHlpRec(
      result,
      `${str} ${isCloseCompleted ? "(" : ")"}`,
      isCloseCompleted ? openNo - 1 : openNo,
      isCloseCompleted ? closeNo : closeNo - 1
    );
  }
};

const generateParenthesisHlp = (result, str, openNo, closeNo) => {
  if (openNo === 0 || closeNo === 0) {
    while (openNo > 0) {
      str += "(";
      openNo -= 1;
    }

    while (closeNo > 0) {
      str += ")";
      closeNo -= 1;
    }

    result.push(str);

    return;
  }

  if (openNo > 0) {
    generateParenthesisHlp(result, str + "(", openNo - 1, closeNo);
  }

  if (openNo < closeNo && closeNo > 0) {
    generateParenthesisHlp(result, str + ")", openNo, closeNo - 1);
  }
};

// console.log(generateParenthesis(3));

// Print all subsequences/Power Set
//This you can find in recursion algo file

//Count all subsequences with sum K
//This you can find in recursion algo file

//Check if there exists a subsequence with sum K
//This you can find in recursion algo file

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

//Subset Sum-I
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

//Subset Sum-II
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

//Letter Combinations of a Phone number
// here this is important a + 1 = b, a + 2 = c
//This can be done easily so i did'nt do it

//Combination Sum - III

var combinationSum3 = function (k, n) {
  const result = [];
  combinationSum3Hlp(k, n, 1, [], result);
  return result;
};

function combinationSum3Hlp(k, n, i, cur, result) {
  if (k === 0 && n === 0) {
    result.push([...cur]);
    return
  }

  if(i > 9) return
  if (k < 0 || n < 0) return;

  cur.push(i);
  combinationSum3Hlp(k - 1, n - i, i + 1, cur, result);
  cur.pop();
  combinationSum3Hlp(k, n, i + 1, cur, result);
}

// console.log(combinationSum3(3, 9));

//Dice thrown
//This is easy just draw the recursion tree you will get it

function swap(first, second, arr) {
  let temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
}

const str1 = ["cat", "bat", "rat"];

const sentence = "The cattle is rattle by the battle";

function soln(str, sentence) {
  const arr = sentence.split(" ");
  for (let i = 0; i < arr.length; i++) {
    for (let item2 of str) {
      if (arr[i].indexOf(item2) !== -1) {
        arr[i] = item2;
      }
    }
  }

  return arr.join(" ");
}

// console.log(soln(str1, sentence))
