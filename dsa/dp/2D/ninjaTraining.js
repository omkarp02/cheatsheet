//this was able to sovle yourself the recusion keep in mind first traverse the first row and do recursion for below it, this tabulation you were not able to understand skip this

function ninjaTraining1(arr, n) {
  function helper(arr, sum, i, n) {
    if (n < 0) {
      return sum;
    }

    let maxi = Number.NEGATIVE_INFINITY;
    for (let j = 0; j < arr[n].length; j++) {
      if (i !== j) {
        const max = helper(arr, sum + arr[n][j], j, n - 1);
        maxi = Math.max(max, maxi);
      }
    }

    return maxi;
  }

  let maxi = Number.NEGATIVE_INFINITY;
  for (let k = 0; k < arr[n - 1].length; k++) {
    maxi = Math.max(maxi, helper(arr, arr[n - 1][k], k, n - 2));
  }

  return maxi;
}

//here in memoizationi we have to argument  like i and n so we need a 2d matrix for memoization
//this were able to do yourself
function ninjaTraining2(arr, n) {
  const dp = [];

  for (let _ of arr) {
    dp.push([]);
  }

  function helper(arr, sum, i, n) {
    if (n < 0) {
      return sum;
    }

    if (dp[n][i] !== undefined) return dp[n][i];

    let maxi = Number.NEGATIVE_INFINITY;
    for (let j = 0; j < arr[n].length; j++) {
      if (i !== j) {
        const max = helper(arr, sum + arr[n][j], j, n - 1);
        maxi = Math.max(max, maxi);
      }
    }

    dp[n][i] = maxi;

    return maxi;
  }

  let maxi = Number.NEGATIVE_INFINITY;
  for (let k = 0; k < arr[n - 1].length; k++) {
    maxi = Math.max(maxi, helper(arr, arr[n - 1][k], k, n - 2));
  }

  return maxi;
}


function ninjaTraining(arr, n) {
  const dp = [];

  for (let _ of arr) {
    dp.push([]);
  }

  function helper(arr, sum, i, n) {
    if (n < 0) {
      return sum;
    }

    if (dp[n][i] !== undefined) return dp[n][i];

    let maxi = Number.NEGATIVE_INFINITY;
    for (let j = 0; j < arr[n].length; j++) {
      if (i !== j) {
        const max = helper(arr, sum + arr[n][j], j, n - 1);
        maxi = Math.max(max, maxi);
      }
    }

    dp[n][i] = maxi;

    return maxi;
  }

  let maxi = Number.NEGATIVE_INFINITY;
  for (let k = 0; k < arr[n - 1].length; k++) {
    maxi = Math.max(maxi, helper(arr, arr[n - 1][k], k, n - 2));
  }
  
  console.log(dp)

  return maxi;
}

const arr = [
  [1, 2, 5],
  [3, 1, 1],
  [3, 3, 3],
];
const n = 3;

console.log(ninjaTraining(arr, n));
