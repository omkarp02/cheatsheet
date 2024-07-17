const grid = 2;

const dp = [];

const matrix = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];

for (let i = 0; i <= grid; i++) {
  dp.push([]);
}

function soln1(r, c) {
  if (r < 0 || c < 0) {
    return 0;
  }

  if (r === 0 && c === 0) return 1;

  if (matrix[r][c] === 1) return 0;

  if (dp[r][c]) return dp[r][c];

  const left = soln1(r - 1, c);
  const right = soln1(r, c - 1);

  dp[r][c] = left + right;

  return left + right;
}

function soln2(r, c) {
  const dp = [];

  for (let i = 0; i <= grid; i++) {
    dp.push([]);
  }

  for (let i = 0; i <= r; i++) {
    for (let j = 0; j <= c; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = 1;
      } else {
        let left = 0;
        let right = 0;
        if (i > 0 && matrix[i][j] === 0) {
          left = dp[i - 1][j];
        }
        if (j > 0 && matrix[i][j] === 0) {
          right = dp[i][j - 1];
        }
        dp[i][j] = left + right;
      }
    }
  }

  return dp[r][c];
}

console.log(soln2(grid, grid));
