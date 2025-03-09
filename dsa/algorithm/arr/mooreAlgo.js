//intially take count as 0 
//and in var ele take the first element like 7


function majorityElement(nums) {
  let el;
  let count = 0;
  for (let item of nums) {
    if (count === 0) {
      el = item;
      count += 1;
    } else if (item === el) {
      count += 1;
    } else {
      count -= 1;
    }
  }

  let elCount = 0
  for (let item of nums) {
    if(item === el) elCount++
  }
  
  return elCount > Math.floor(nums.length / 2) ? el : -1
}

const nums = [7, 7, 5, 7, 5, 1, 5, 7, 5, 5, 7, 7, 5, 5, 5, 5];
console.log(majorityElement(nums));
