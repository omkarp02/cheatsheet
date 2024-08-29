//this ver able to solve yourself just check the
//thisis correct     let up = cur;
//                   if (j > 0) up += dp[j - 1][k];
//                   else up += Infinity;

// you sometime do mistake and write if( j > 0) up = cur + dp[j - 1][k]

var minPathSum1 = function (grid) {
  function helper(row, col, grid) {
    if (row === 0 && col === 0) {
      return grid[row][col];
    }

    if (row < 0 || col < 0) {
      return Infinity;
    }

    const left = grid[row][col] + helper(row - 1, col, grid);
    const right = grid[row][col] + helper(row, col - 1, grid);
    return Math.min(left, right);
  }

  const row = grid.length;
  const col = grid[0].length;
  return helper(row - 1, col - 1, grid);
};

var minPathSum2 = function (grid) {
  function helper(row, col, grid) {
    if (row === 0 && col === 0) {
      return grid[row][col];
    }

    if (row < 0 || col < 0) {
      return Infinity;
    }

    if (dp[row][col] !== undefined) return dp[row][col];

    const left = grid[row][col] + helper(row - 1, col, grid);
    const right = grid[row][col] + helper(row, col - 1, grid);

    dp[row][col] = Math.min(left, right);

    return Math.min(left, right);
  }

  const dp = [];

  const row = grid.length;
  const col = grid[0].length;

  for (let i = 0; i < row; i++) {
    dp[i] = [];
  }

  return helper(row - 1, col - 1, grid);
};

var minPathSum = function (grid) {
  const dp = [];

  const row = grid.length;
  const col = grid[0].length;

  for (let i = 0; i < row; i++) {
    dp[i] = [];
  }

  for (let j = 0; j < row; j++) {
    for (let k = 0; k < col; k++) {
      if (j === 0 && k === 0) dp[j][k] = grid[j][k];
      else {
        const cur = grid[j][k];

        let up = cur;
        if (j > 0) up += dp[j - 1][k];
        else up += Infinity;

        let left = cur;
        if (k > 0) left += dp[j][k - 1];
        else left += Infinity;

        dp[j][k] = Math.min(up, left);
      }
    }
  }

  return dp[row - 1][col - 1];
};

const grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
];

console.log(minPathSum(grid));
