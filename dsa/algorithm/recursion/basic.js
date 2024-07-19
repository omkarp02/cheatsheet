/*

    Here there are two type of recusion parameterise and functional recursion

    Paramererise

    So when parameter return the final value like
    f(3, 0) => f(2, 3) => f(1, 5) => f(0, 6)
    now here the sum is 3 + 2 + 1 which is 6 this is parameterise way

    Functional

    You want the function to return the value

  function asdf(n) {
  if (n === 0) {
    return 0;
  }
  return n + f(n - 1);
}

here this example function is returning something

*/

/*
    subset take not take 

                            312 
                3/12                     /12    
        31/2            3/2     1/2               /2   


    Remember in subsets you alway get the answer in final stage means at end of recursion


*/

//this pattern print all subset
function subset(nums, i, final) {
  if (i === nums.length) {
    console.log(final);
    return;
  }

  final.push(nums[i]);
  subset(nums, i + 1, final);
  final.pop();
  subset(nums, i + 1, final);
}

const arr = [3, 1, 2];

// console.log(subset(arr, 0, []));

//this pattern find the target sum for the target value
function subsetSum(nums, i, final, sum, target) {
  if (i === nums.length) {
    if (sum === target) {
      console.log(final);
    }
    return;
  }

  final.push(nums[i]);
  subsetSum(nums, i + 1, final, sum + nums[i], target);

  final.pop();
  subsetSum(nums, i + 1, final, sum, target);
}
const arr2 = [1, 2, 1];

// subsetSum(arr2, 0, [], 0, 2);

//this pattern find subsequence where sum is sum just find one subsequese whose sum is equal to the target

/*

Here follow this steps 
if base condition success return true else false


put the condition call in if and if the recursion return true directly return true
    
*/

function subsetSumOne(nums, i, final, sum, target) {
  if (i === nums.length) {
    if (sum === target) {
      return true;
    }
    return false;
  }

  final.push(nums[i]);
  if (subsetSumOne(nums, i + 1, final, sum + nums[i], target)) return true;

  final.pop();
  if (subsetSumOne(nums, i + 1, final, sum, target)) return true;
  return false;
}
const arr3 = [1, 2, 1];

// console.log(subsetSumOne(arr2, 0, [], 0, 2));

//count of the subsequences

/*
    so this is the basic struture

    base case

    return 1 => if satisfied
    return 2 => if not satisfied

    l = f()
    r = f()

    return l + r

*/

function subsetSumCount(nums, i, final, sum, target) {
  if (i === nums.length) {
    if (sum === target) {
      return 1;
    }
    return 0;
  }

  final.push(nums[i]);
  const left = subsetSumOne(nums, i + 1, final, sum + nums[i], target);

  final.pop();
  const right = subsetSumOne(nums, i + 1, final, sum, target);
  return left + right;
}

const arr4 = [1, 2, 1];

console.log(subsetSumCount(arr2, 0, [], 0, 2));
