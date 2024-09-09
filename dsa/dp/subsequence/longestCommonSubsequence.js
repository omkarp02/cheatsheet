//for this understand the recursion
//here base case for tabulation is also complex see this
//here you can jsut watch the video one time

var longestCommonSubsequence1 = function (text1, text2) {
  const dp = Array.from({ length: text1.length }, () => []);

  function helper(a, b) {
    if (a < 0 || b < 0) {
      return 0;
    }

    if (dp[a][b] !== undefined) return dp[a][b];

    let ans = null;
    if (text1[a] === text2[b]) {
      ans = 1 + helper(a - 1, b - 1);
    } else {
      ans = 0 + Math.max(helper(a - 1, b), helper(a, b - 1));
    }

    dp[a][b] = ans;

    return ans;
  }

  return helper(text1.length - 1, text2.length - 1);
};

//here if you see we have done shifting of index
var longestCommonSubsequence2 = function (text1, text2) {
  const dp = Array.from({ length: text1.length + 1 }, () => []);

  function helper(a, b) {
    if (a === 0 || b === 0) {
      return 0;
    }

    if (dp[a][b] !== undefined) return dp[a][b];

    let ans = null;
    if (text1[a - 1] === text2[b - 1]) {
      ans = 1 + helper(a - 1, b - 1);
    } else {
      ans = 0 + Math.max(helper(a - 1, b), helper(a, b - 1));
    }

    dp[a][b] = ans;

    return ans;
  }
  return helper(text1.length, text2.length);
};

var longestCommonSubsequence = function (text1, text2) {
  const dp = Array.from({ length: text1.length + 1 }, () => []);

  for (let i = 0; i <= text1.length; i++) {
    dp[i][0] = 0;
  }

  for (let j = 0; j <= text2.length; j++) {
    dp[0][j] = 0;
  }

  for (let k = 1; k <= text1.length; k++) {
    for (let l = 1; l <= text2.length; l++) {
      let ans = null;
      if (text1[k - 1] === text2[l - 1]) {
        ans = 1 + dp[k - 1][l - 1];
      } else {
        ans = 0 + Math.max(dp[k - 1][l], dp[k][l - 1]);
      }

      dp[k][l] = ans;
    }
  }

  return dp[text1.length][text2.length];
};

const text1 = "abcde";
const text2 = "ace";
// console.log(longestCommonSubsequence(text1, text2));

function soln(n) {
  let last = n;
  let start = 1;
  let add = 2;
  let i = 1;
  let prev = i;
  let secondStart = null;

  while (i < n) {
    prev = i;

    if (i + add > n) {
      ans = i
      if (last !== i) {
        isLastKilled = true;
        last = i;
        i = start;
        add += add;
      } else {
        last = i;
        isLastKilled = false;
        i = secondStart;
        start = secondStart;
        add += add;
      }

      if(add >= n){
        return ans
      }
    } else {
      if (i === start) {
        secondStart = i + add;
      }
      i += add;
    }
  }
  return prev;
}

console.time()
console.log(soln(1000000000000000));
console.timeEnd()
