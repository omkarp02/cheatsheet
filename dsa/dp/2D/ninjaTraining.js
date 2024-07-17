function soln1(arr, n, taskPerformed) {
  if (n < 0) {
    return 0;
  }

  let max = 0;
  for (let i = 0; i < arr[n].length; i++) {
    if (i !== taskPerformed) {
      const cur = arr[n][i];
      max = Math.max(max, soln1(arr, n - 1, i) + cur);
    }
  }
  return max;
}

const arr = [
  [10, 50, 1],
  [5, 100, 11],
];

const dp = [];

for (let _ of arr) {
  dp.push([]);
}

// console.log(soln1(arr, arr.length - 1, arr[0].length));

function soln2(arr, n, taskPerformed) {
  if (n < 0) {
    return 0;
  }

  if (dp[n][taskPerformed]) return dp[n][taskPerformed];

  let max = 0;
  for (let i = 0; i < arr[n].length; i++) {
    if (i !== taskPerformed) {
      const cur = arr[n][i];
      max = Math.max(max, soln2(arr, n - 1, i) + cur);
    }
  }
  return (dp[n][taskPerformed] = max);
}

// console.log(soln2(arr, arr.length - 1, arr[0].length));

function soln3(arr, n, taskPerformed) {
  const dp = [];
  for (let _ of arr) {
    dp.push([])
  }

  dp[0][0] = Math.max(arr[0][1], arr[0][2]);
  dp[0][1] = Math.max(arr[0][0], arr[0][2]);
  dp[0][2] = Math.max(arr[0][1], arr[0][0]);

  for (let i = 1; i < arr.length; i++) {
    for (let last = 0; last < arr[i].length; last++) {
      let max = 0
      
      for (let task = 0; task < arr[i].length; task++) {
        if (task !== last) {
          const cur = arr[i][task];
          max = Math.max(max, cur + dp[i-1][task])
        }
      }

      dp[i][last] = max;
    }
  }

  return {ans: dp[n][2], arr: dp};
}
// console.log(soln3(arr, arr.length - 1, arr[0].length));

//this is with space optimization 2d array
function soln4(arr, n, taskPerformed) {
  let prev = [];

  prev[0] = Math.max(arr[0][1], arr[0][2]);
  prev[1] = Math.max(arr[0][0], arr[0][2]);
  prev[2] = Math.max(arr[0][1], arr[0][0]);

  for (let i = 1; i < arr.length; i++) {
    let temp = []
    for (let last = 0; last < arr[i].length; last++) {
      let max = 0
      for (let task = 0; task < arr[i].length; task++) {
        if (task !== last) {
          const cur = arr[i][task];
          max = Math.max(max, cur + prev[task])
        }
      }
      temp[last] = max;
    }
    prev = temp
  }

  return {ans: prev[2]};
}
console.log(soln4(arr, arr.length - 1, arr[0].length));
