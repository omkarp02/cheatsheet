//you were able to solve but try doing the tabulation just the tabluation

var minFallingPathSum1 = function (matrix) {
  const n = matrix.length;

  function helper(row, col) {
    if (col < 0 || col > n - 1) {
      return Infinity;
    }

    if (row === n - 1) {
      return matrix[row][col];
    }

    //diagonal left
    const diagonalLeft = matrix[row][col] + helper(row + 1, col - 1);

    //down
    const down = matrix[row][col] + helper(row + 1, col);

    //diagonal right
    const diagonalRight = matrix[row][col] + helper(row + 1, col + 1);

    return Math.min(down, diagonalLeft, diagonalRight);
  }

  let mini = Infinity;
  for (let i = 0; i < matrix[0].length; i++) {
    const min = helper(0, i);
    mini = Math.min(min, mini);
  }

  return mini;
};

var minFallingPathSum2 = function (matrix) {
  const n = matrix.length;

  function helper(row, col) {
    if (col < 0 || col > n - 1) {
      return Infinity;
    }

    if (row === n - 1) {
      return matrix[row][col];
    }

    if (dp[row][col] !== undefined) return dp[row][col];

    //diagonal left
    const diagonalLeft = matrix[row][col] + helper(row + 1, col - 1);

    //down
    const down = matrix[row][col] + helper(row + 1, col);

    //diagonal right
    const diagonalRight = matrix[row][col] + helper(row + 1, col + 1);

    const ans = Math.min(down, diagonalLeft, diagonalRight);

    dp[row][col] = ans;

    return ans;
  }

  const dp = [];
  for (let _ of matrix) {
    dp.push([]);
  }

  let mini = Infinity;
  for (let i = 0; i < matrix[0].length; i++) {
    const min = helper(0, i);
    mini = Math.min(min, mini);
  }

  console.log(dp);

  return mini;
};

var minFallingPathSum = function (matrix) {
  const dp = [];
  const n = matrix.length;

  for (let _ of matrix) {
    dp.push([]);
  }

  for (let i = 0; i < matrix[n - 1].length; i++) {
    dp[n - 1][i] = matrix[n - 1][i];
  }

  for (let row = n - 2; row >= 0; row--) {
    for (let col = 0; col < n; col++) {
      let diagonalLeft = matrix[row][col];

      if (col > 0) diagonalLeft += dp[row + 1][col - 1];
      else diagonalLeft = Infinity

      let down = matrix[row][col] + dp[row + 1][col];

      let diagonalRight = matrix[row][col];

      if (col < n - 1) diagonalRight += dp[row + 1][col + 1];
      else diagonalRight = Infinity

      dp[row][col] = Math.min(down, diagonalLeft, diagonalRight);
    }
  }

  return Math.min(...dp[0])
};

const matrix = [
  [2, 1, 3],
  [6, 5, 4],
  [7, 8, 9],
];

console.log(minFallingPathSum(matrix));
