function soln1(n) {
  if (n === 0) {
    return 1;
  }
  if (n < 0) {
    return 0;
  }

  return soln1(n - 2) + soln1(n - 1);
}

// console.log(soln1(4))

function soln2(n) {
  if (n <= 1) {
    return n;
  }

  const prev2 = n - 2
  const prev = n - 1

  for (let i = 2; i <= n; i++) {
    const cur = prev2 + prev
    
  }

  return soln2(n - 2) + soln2(n - 1);
}

console.log(soln2(4));
