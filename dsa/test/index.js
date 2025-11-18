var minFlips = function (target) {
  let prev = "0";
  let count = 0;
  for (let i = 0; i < target.length; i++) {
    if (target[i] !== prev) {
      count++;
    }
    prev = target[i];
  }
  return count;
};

function flipFromIndex(cur, index) {
  let newCur = cur.slice(0, index);
  for (let i = index; i < cur.length; i++) {
    newCur += cur[i] === "0" ? "1" : "0";
  }
  return newCur;
}

const target = "10111";

console.log(minFlips(target));
