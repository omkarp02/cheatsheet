const data = [[1], [2, 3], [3, 6, 7], [8, 9, 6, 10]];

const dp = [];
for (let _ of data) {
  dp.push([]);
}

const grid = 0;

function soln1(data, r, c) {
  if (r === data.length - 1) {
    return data[r][c];
  }
  if (dp[r][c]) return dp[r][c];
  const down = soln1(data, r + 1, c);
  const diagonal = soln1(data, r + 1, c + 1);
  const ans = Math.min(down, diagonal) + data[r][c];
  if (dp[r][c]) dp[r][c] = ans;
  return ans;
}

// console.log(soln1(data, grid, grid));

function soln2(data) {
  const dp = [];
  for (let _ of data) {
    dp.push([]);
  }
  const lastRow = data.length - 1;
  for (let i = 0; i < data[lastRow].length; i++) {
    dp[lastRow][i] = data[lastRow][i];
  }

  for (let i = lastRow - 1; i >= 0; i--) {
    for (let j = 0; j < data[i].length; j++) {
      let down = dp[i + 1][j];
      let up = dp[i + 1][j + 1];
      dp[i][j] = Math.min(down, up) + data[i][j];
    }
  }

  return dp[0][0];
}

console.log(soln2(data, grid, grid));
