const arr = [
  [1, 2, 10, 4],
  [100, 3, 2, 1],
  [1, 1, 20, 2],
  [1, 2, 2, 1],
];

function soln1(matrix) {
  let min = Infinity;
  const lastRow = arr.length - 1;
  const dp = [];
  for (let _ of matrix) {
    dp.push([]);
  }
  for (let i = 0; i < arr[lastRow].length; i++) {
    min = Math.min(findPath1(lastRow, i, matrix, dp), min);
  }
  return { min, dp };
}

function findPath1(r, c, matrix, dp) {
  if (c < 0 || c > arr[0].length - 1) {
    return Infinity;
  }

  if (r === 0) {
    dp[r][c] = matrix[r][c];
    return matrix[r][c];
  }

  if (dp[r][c]) return dp[r][c];

  const down = findPath1(r - 1, c, matrix, dp);
  const downLeft = findPath1(r - 1, c - 1, matrix, dp);
  const downRight = findPath1(r - 1, c + 1, matrix, dp);

  const ans = Math.min(down, downLeft, downRight) + matrix[r][c];

  dp[r][c] = ans;

  return ans;
}

// console.log(soln1(arr));

function soln2(matrix) {
  const dp = [];
  for (let _ of matrix) {
    dp.push([]);
  }

  dp[0][0] = matrix[0][0];
  dp[0][1] = matrix[0][1];
  dp[0][2] = matrix[0][2];
  dp[0][3] = matrix[0][3];

  for (let i = 1; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const down = matrix[i][j] + dp[i - 1][j];
      const downLeft = j > 0 ? matrix[i][j] + dp[i - 1][j - 1] : Infinity;
      const downRight =
        j < matrix[i].length - 1 ? matrix[i][j] + dp[i - 1][j + 1] : Infinity;
      dp[i][j] = Math.min(down, downLeft, downRight);
    }
  }

  return {ans: Math.min(...dp[dp.length - 1]), dp};
}

console.log(soln2(arr));

function findPath2(matrix, dp, r) {}
