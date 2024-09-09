//here in recusion code not working for one case striver written the same code having the issue don't mind it
//if there is count problem make sure the fill the array with zero

var change1 = function (amount, coins) {
  if (amount === 0) return amount;

  function helper(coins, i, amount) {
    if (i === 0) {
      return amount % coins[i] === 0 ? 1 : 0;
    }

    let nottake = helper(coins, i - 1, amount);
    let take = 0;
    if (amount >= coins[i]) {
      take = helper(coins, i, amount - coins[i]);
    }

    return nottake + take;
  }

  const ans = helper(coins, coins.length - 1, amount);

  return ans === Infinity ? -1 : ans;
};

var change = function (amount, coins) {
  const dp = Array.from({ length: coins.length }, () =>
    Array(amount + 1).fill(0)
  );

  for (let i = 0; i <= amount; i++) {
    if (i % coins[0] === 0) {
      dp[0][i] = 1;
    }
    // Else condition is automatically fulfilled,
    // as dp array is initialized to zero
  }

  for (let j = 1; j < coins.length; j++) {
    for (let k = 0; k <= amount; k++) {
      let nottake = dp[j - 1][k];
      let take = 0;
      if (k >= coins[j]) {
        take = dp[j][k - coins[j]];
      }

      dp[j][k] = take + nottake;
    }
  }

  return dp[coins.length - 1][amount];
};

const coins = [1, 2, 5];
const amount = 4;

console.log(change(amount, coins));
