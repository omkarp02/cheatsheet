//read the comment and learn or try doing climbing stair yourself and see the commnent of rest of the problem




//this is basic recursion
function soln1(n) {
  if (n <= 1) {
    return n;
  }

  return soln1(n - 1) + soln1(n - 2);
}

console.log(soln1(3));

//this is memoization
const dp = [];
function soln2(n) {
  if (n <= 1) {
    return n;
  }

  if (dp[n] !== undefined) return dp[n];

  const val = soln2(n - 1) + soln2(n - 2);
  dp[n] = val;
  return val;
}

console.log(soln2(3));

//recursino to tabulation
//always remember start recursion from n like f(3) => f(2) and so on

function soln3(n) {
  //always try to represent in index and try to convert the problem in zero base index if possible
  //define the dp array
  const dp = [];

  //write the exact base case like
  dp[0] = 1;
  dp[1] = 1;

  //check the recurance relationship and write same
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp
}

console.log(soln3(3));

//space optimization
function soln3(n) {

  //write the exact base case like
  let prev = 1;
  let prev2 = 1;

  //check the recurance relationship and write same
  for (let i = 2; i < n; i++) {
    cur = prev + prev2
    prev2 = prev
    prev = cur
  }

  return prev
}

console.log(soln3(3));