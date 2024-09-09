//this you were able to do it yourself
function knapsack1(weight, val, cap) {
  function helper(i, cap, weight, val) {
    if (i === 0) {
      if (cap >= weight[i]) {
        const number = Math.floor(cap / weight[i])
        return val[i] * number
      } else {
        return 0;
      }
    }

    //keep this in mind
    let pick = Number.NEGATIVE_INFINITY;
    if (cap >= weight[i]) {
      pick = val[i] + helper(i, cap - weight[i], weight, val);
    }

    let notpick = 0 + helper(i - 1, cap, weight, val);

    return Math.max(pick, notpick);
  }

  const n = weight.length;
  return helper(n - 1, cap, weight, val);
}

const val = [1, 1]
const wt = [2, 1]
const w = 3;

console.log(knapsack1(wt, val, w));
