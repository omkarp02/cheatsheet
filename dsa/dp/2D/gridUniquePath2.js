//this you werwe able to solve yourself

const row = 3;
const col = 3;

const dp = [];

for (let i = 0; i < row; i++) {
  dp[i] = [];
}

const obstacleGrid = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];

function gridUniquePath2(row, col) {
  if (row === 0 && col === 0) {
    return 1;
  }

  if (row < 0 || col < 0) {
    return 0;
  }

  if (obstacleGrid[row][col]) {
    return 0;
  }

  if (dp[row][col] !== undefined) return dp[row][col];

  const left = gridUniquePath2(row - 1, col);
  const right = gridUniquePath2(row, col - 1);

  dp[row][col] = left + right;

  return left + right;
}

console.log(gridUniquePath2(row - 1, col - 1, obstacleGrid));
