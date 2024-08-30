var coinChange1 = function (coins, amount) {
  if (amount === 0) return amount;

  function helper(coins, i, amount) {
    if (i === 0) {
      return amount % arr[i] === 0 ? amount / arr[i] : Infinity;
    }

    let nottake = 0 + helper(coins, i - 1, amount);
    let take = Infinity;
    if (amount >= coins[i]) {
      //here we are not passing i - 1 because of the infinite pick
      take = 1 + helper(coins, i, amount - coins[i]);
    }

    return Math.min(nottake, take);
  }

  const ans = helper(coins, coins.length - 1, amount);

  return ans === Infinity ? -1 : ans;
};

var coinChange = function (coins, amount) {
  const dp = [];

  for (let _ of coins) {
    dp.push([]);
  }

  for (let i = 0; i <= amount; i++) {
    if (i % coins[0] === 0) {
      dp[0][i] = i / coins[0];
    } else {
      dp[0][i] = Infinity;
    }
  }

  for (let j = 1; j < coins.length; j++) {
    for (let k = 0; k <= amount; k++) {
      let nottake = dp[j - 1][k];
      let take = Infinity;
      if (k >= coins[j]) {
        take = 1 + dp[j][k - coins[j]];
      }

      dp[j][k] = Math.min(nottake, take);
    }
  }

  const ans = dp[coins.length - 1][amount];

  return ans === Infinity ? -1 : ans;
};

const coins = [1, 2, 5];
const amount = 11;

console.log(coinChange(coins, amount));
