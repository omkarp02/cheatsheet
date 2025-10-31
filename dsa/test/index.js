function soln(nums) {
  nums.sort((a, b) => a - b);
  const dp = [];
  const backtrack = [];

  for (let i = 0; i < nums.length; i++) {
    dp[i] = 1;
    backtrack[i] = i;
  }

  let max = 0;
  for (let i = 1; i < nums.length; i++) {
    const cur = nums[i];
    for (let j = 0; j < i; j++) {
      if (getLongestStringChain(nums[j], cur) && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        backtrack[i] = j;
      }
    }
    if (dp[i] > dp[max]) {
      max = i;
    }
  }

  const result = [];
  let count = dp[max] - 1;
  while (backtrack[max] !== max) {
    result[count] = nums[max];
    count--;
    max = backtrack[max];
  }
  result[0] = nums[max];
  return result;
}

function getLongestStringChain(word1, word2) {
  if (word1.length + 1 !== word2.length) return false;
  let noOfNotMatch = 0;
  let i = 0,
    j = 0;
  while (i < word1.length && j < word2.length) {
    if (word1[i] !== word2[j]) {
        noOfNotMatch++;
        j++;
        if (noOfNotMatch > 1) return false;
    }else{
        i++
        j++
    }
  }
  return true;  
}

const nums = ["a", "b", "ba", "bca", "bda", "bdca"];
console.log(soln(nums));
