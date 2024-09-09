function rodCutting(i, n, price) {
  if (i === 0) {
    return n * price[i];
  }

  let nottake = 0 + rodCutting(i - 1, n, price);

  let take = Number.NEGATIVE_INFINITY;
  const rodLength = i + 1;
  if (rodLength <= n) {
    take = price[i] + rodCutting(i, n - rodLength, price);
  }

  return Math.max(take, nottake);
}

const price = [1, 5, 8, 9, 10, 17, 17, 20];
const n = price.length;

console.log(rodCutting(n - 1, n, price));
