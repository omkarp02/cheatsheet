//able to solve the recursion and memoization but not tabulation for tabulation check the comments
//here keep on thing in mind try to represent the tabulatino in using recursion like in the initally row is 3 and so on like 3, 2, 1, 0 so we do same in tabulation like 3, 2, 1,0 but from down to up so 0, 1, to 3 like that

const row = 3;
const col = 3;

function gridUniquePath1(row, col) {
  if (row === 0 && col === 0) {
    return 1;
  }

  if (row < 0 || col < 0) {
    return 0;
  }

  const left = gridUniquePath1(row - 1, col);
  const right = gridUniquePath1(row, col - 1);
  return left + right;
}

const dp = [];

for (let i = 0; i < row; i++) {
  dp[i] = [];
}

function gridUniquePath2(row, col) {
  if (row === 0 && col === 0) {
    return 1;
  }

  if (row < 0 || col < 0) {
    return 0;
  }

  if (dp[row][col] !== undefined) return dp[row][col];

  const left = gridUniquePath2(row - 1, col);
  const right = gridUniquePath2(row, col - 1);

  dp[row][col] = left + right;

  return left + right;
}

function gridUniquePath(row, col) {
  const dp = [];

  for (let i = 0; i < row; i++) {
    dp[i] = [];
  }

  //declare the base case
  dp[0][0] = 1;

  //expresss all state in for loop
  for (let j = 0; j < row; j++) {
    for (let k = 0; k < col; k++) {
      if (j === 0 && k === 0) dp[0][0] = 1;
      else {
        let up = 0;
        let left = 0;
        //copy the recurrance and write
        if (j > 0) up = dp[j - 1][k];
        if (k > 0) left = dp[j][k - 1];

        dp[j][k] = up + left;
      }
    }
  }

  return dp[row - 1][col - 1];
}

console.log(gridUniquePath2(row - 1, col - 1));
