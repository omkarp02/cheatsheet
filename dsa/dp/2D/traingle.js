//this you were able to do yourself

var minimumTotal1 = function (triangle) {
  const n = triangle.length;

  function helper(row, col) {
    if (row === n - 1) {
      return triangle[row][col];
    }

    let down = triangle[row][col] + helper(row + 1, col);
    let downRight = triangle[row][col] + helper(row + 1, col + 1);

    return Math.min(down, downRight);
  }

  return helper(0, 0);
};

var minimumTotal2 = function (triangle) {
  const n = triangle.length;

  function helper(row, col) {
    if (row === n - 1) {
      return triangle[row][col];
    }

    if (dp[row][col] !== undefined) return dp[(row, col)];
    let down = triangle[row][col] + helper(row + 1, col);
    let downRight = triangle[row][col] + helper(row + 1, col + 1);

    dp[row][col] = Math.min(down, downRight);

    return Math.min(down, downRight);
  }

  const dp = [];
  for (let _ of triangle) {
    dp.push([]);
  }

  const ans = helper(0, 0);
  return ans;
};

var minimumTotal = function (triangle) {
  const n = triangle.length;
  const dp = [];
  for (let _ of triangle) {
    dp.push([]);
  }

  for (let i = 0; i < triangle[n - 1].length; i++) {
    dp[n - 1][i] = triangle[n - 1][i];
  }

  for (let row = n - 2; row >= 0; row--) {
    for (let col = 0; col < row + 1; col++) {
      let up = triangle[row][col] + dp[row + 1][col];
      let down = triangle[row][col] + dp[row + 1][col + 1];

      dp[row][col] = Math.min(up, down);
    }
  }

  return dp[0][0];
};

const triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]];
console.log(minimumTotal(triangle));
