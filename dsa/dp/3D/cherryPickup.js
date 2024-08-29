function cherryPickup(grid, n, m) {
  function helper(i, j, row) {

    if(i === n - 1 && j === n - 1){
        return grid[row][i] + grid[row][j]
    }

    //down
    const down = grid[row][i] + grid[row][j] + helper(i, j, row + 1);

    //diagonal left
    const diagonalLeft =
      grid[row][i] + grid[row][j] + helper(i - 1, j - 1, row + 1);

    //diagonal right
    const diagonalRight = grid[row][col] + helper(i + 1, j + 1, row + 1);

    

  }

  helper(0, m - 1, 0);
}

const grid = [
  [3, 1, 1],
  [2, 5, 1],
  [1, 5, 5],
  [2, 1, 1],
];
const n = grid.length;
const m = grid[0].length;

cherryPickup(grid, n, m);
