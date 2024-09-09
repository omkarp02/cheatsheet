//this is first problem of stock you can watch video or just try to draw the recursion tree
//this is very great recursion pattern
var maxProfit1 = function (prices) {
  const n = prices.length;
  function helper(ind, buy) {
    //base case
    if (ind === n) {
      return 0;
    }

    if (buy) {
      let take = -prices[ind] + helper(ind + 1, false);
      let nottake = 0 + helper(ind + 1, true);
      profit = Math.max(take, nottake);
    } else {
      let take = prices[ind] + helper(ind + 1, true);
      let nottake = 0 + helper(ind + 1, false);
      profit = Math.max(take, nottake);
    }

    return profit;
  }

  const ans = helper(0, true);
  return ans;
};

var maxProfit2 = function (prices) {
  const n = prices.length;
  const dp = new Array(n + 1).fill(null).map(() => new Array(2).fill(-1));

  dp[n][0] = 0;
  dp[n][1] = 0;

  for (let ind = n - 1; ind >= 0; ind--) {
    for (let buy = 0; buy <= 1; buy++) {
      let profit = 0;
      if (buy) {
        let take = -prices[ind] + dp[ind + 1][0];
        let nottake = 0 + dp[ind + 1][1];
        profit = Math.max(take, nottake);
      } else {
        let take = prices[ind] + dp[ind + 1][1];
        let nottake = 0 + dp[ind + 1][0];
        profit = Math.max(take, nottake);
      }

      dp[ind][buy] = profit;
    }
  }

  return dp[0][1];
};

var maxProfit = function (prices) {
  const n = prices.length;
  let ahead = [];
  let cur = [];

  ahead[0] = ahead[1] = 0;

  for (let ind = n - 1; ind >= 0; ind--) {
    for (let buy = 0; buy <= 1; buy++) {
      let profit = 0;
      if (buy) {
        let take = -prices[ind] + ahead[0];
        let nottake = 0 + ahead[1];
        profit = Math.max(take, nottake);
      } else {
        let take = prices[ind] + ahead[1];
        let nottake = 0 + ahead[0];
        profit = Math.max(take, nottake);
      }

      cur[buy] = profit;
    }
    ahead = cur
  }

  return ahead[1]
};

const prices = [7, 1, 5, 3, 6, 4];

console.log(maxProfit(prices));
