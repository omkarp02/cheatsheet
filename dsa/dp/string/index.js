var longestCommonSubsequence = function (text1, text2) {
  function helper(indOne, indTwo) {
    if (indOne === 0 || indTwo === 0) {
      return 0;
    }

    if (text1[indOne - 1] === text2[indTwo - 1]) {
      return helper(indOne - 1, indTwo - 1) + 1;
    }

    return Math.max(helper(indOne - 1, indTwo), helper(indOne, indTwo - 1));
  }

  return helper(text1.length, text2.length);
};

var longestCommonSubsequence = function (text1, text2) {
  const n = text1.length;
  const m = text2.length;

  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(-1));

  for (let i = 0; i <= m; i++) {
    dp[0][i] = 0;
  }

  for (let i = 0; i <= n; i++) {
    dp[i][0] = 0;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[dp.length - 1][dp[0].length - 1];
};

//print the string
var printlongestCommonSubsequence = function (text1, text2) {
  const n = text1.length;
  const m = text2.length;

  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(""));

  for (let i = 0; i <= m; i++) {
    dp[0][i] = "";
  }

  for (let i = 0; i <= n; i++) {
    dp[i][0] = "";
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + text1[i - 1];
      } else {
        dp[i][j] =
          dp[i - 1][j].length > dp[i][j - 1].length
            ? dp[i - 1][j]
            : dp[i][j - 1];
      }
    }
  }

  return dp[dp.length - 1][dp[0].length - 1].length;
};

const printLongestCommonSubsequence2 = function (text1, text2) {
  const dp = longestCommonSubsequence(text1, text2);
  let i = dp.length - 1;
  let j = dp[0].length - 1;
  let str = "";
  while (i > 0 && j > 0) {
    if (text1[i - 1] === text2[j - 1]) {
      i = i - 1;
      j = j - 1;
      str += text1[i];
    } else {
      if (dp[i - 1][j] > dp[i][j - 1]) {
        i = i - 1;
      } else {
        j = j - 1;
      }
    }
  }

  return str;
};

var longestCommonSubString = function (text1, text2) {
  const n = text1.length;
  const m = text2.length;

  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(-1));

  for (let i = 0; i <= m; i++) {
    dp[0][i] = 0;
  }

  for (let i = 0; i <= n; i++) {
    dp[i][0] = 0;
  }

  let max = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        max = Math.max(dp[i][j], max);
      } else {
        dp[i][j] = 0;
      }
    }
  }

  return max;
};

const shortestSupersequence = function (text1, text2) {
  const dp = longestCommonSubsequence(text1, text2);
  let i = dp.length - 1;
  let j = dp[0].length - 1;
  let str = "";

  while (i > 0 && j > 0) {
    if (text1[i - 1] === text2[j - 1]) {
      str += text1[i - 1];
      i = i - 1;
      j = j - 1;
    } else {
      if (dp[i - 1][j] > dp[i][j - 1]) {
        str += text1[i - 1];
        i = i - 1;
      } else {
        str += text2[j - 1];
        j = j - 1;
      }
    }
  }

  if (i > 0) {
    str += text1[i - 1];
    i -= 1;
  }

  if (j > 0) {
    str += text2[j - 1];
    j -= 1;
  }

  return str;
};
