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


  let row = text1.length
  let col = text2.length
  console.log(dp)
  let str = ''
  while(row > 0 && col > 0){
    if(text1[row - 1] === text2[col - 1]){
        str += text1[row - 1]
        row--
        col--
    }else{
        if(dp[row - 1][col] > dp[row][col - 1]){
            row--
        }else{
            col--
        }
    }
  }

  return str

 
//   return dp[text1.length][text2.length];
};

const text1 = "abcde";
const text2 = "ace";

console.log(longestCommonSubsequence(text1, text2))
