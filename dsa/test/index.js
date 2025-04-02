var lengthOfLongestSubstring = function (s) {
  const obj = {};
  let l = 0;
  let r = 0;
  let max = 0;
  while (r < s.length) {
    const cur = s[r];
    if (obj[cur] !== undefined) {
      if(obj[cur] >= l){
        l = obj[cur] + 1;
      }
    }

    obj[cur] = r;
    max = Math.max(max, r - l + 1);
    r++;
  }
  return max;
};

const s = "abba";
console.log(lengthOfLongestSubstring(s));
