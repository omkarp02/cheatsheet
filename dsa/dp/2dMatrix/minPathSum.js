const grid = 2;

const dp = [];

const matrix = [
  [10, 8, 2],
  [10, 5, 100],
  [1, 1, 2],
];

for (let i = 0; i <= grid; i++) {
  dp.push([]);
}

function soln1(r, c) {
  if (r < 0 || c < 0) {
    return Infinity;
  }

  if (r === 0 && c === 0) return matrix[r][c];

  const left = soln1(r - 1, c);
  const right = soln1(r, c - 1);

  return Math.min(left, right) + matrix[r][c];
}

// console.log(soln1(grid, grid));

function soln2(r, c) {
  if (r < 0 || c < 0) {
    return Infinity;
  }

  if (r === 0 && c === 0) return matrix[r][c];

  if (dp[r][c]) return dp[r][c];

  const left = soln2(r - 1, c);
  const right = soln2(r, c - 1);

  dp[r][c] = Math.min(left, right) + matrix[r][c];
  return Math.min(left, right) + matrix[r][c];
}

// console.log(soln2(grid, grid));

function soln3(r, c) {
  const dp = [];

  for (let i = 0; i <= grid; i++) {
    dp.push([]);
  }

  for (let i = 0; i <= r; i++) {
    for (let j = 0; j <= c; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = matrix[i][j];
      } else {
        let left = Infinity;
        let right = Infinity;
        if (i > 0) {
          left = dp[i - 1][j];
        }
        if (j > 0) {
          right = dp[i - 1][j];
        }
        dp[r][c] = Math.min(left, right) + matrix[r][c];
      }
    }
  }

  return dp[r][c]
}

console.log(soln2(grid, grid));
