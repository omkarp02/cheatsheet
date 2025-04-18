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

//algo 4

// https://www.youtube.com/watch?v=G1fRTGRxXU8&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=51
//6:00


//algo 1
//this pattern print all subset
//here there is also when we can pick one element infinte time at that time don't increase index
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


//algo 2
//this pattern find the target sum for the target value
//here we are decreaseing the target till we get 0 
function subsetSum(nums, i, final, target) {
  if (i === nums.length) {
    if (target === 0) {
      console.log(final);
    }
    return;
  }

  if (nums[i] <= target) {
    final.push(nums[i]);
    subsetSum(nums, i + 1, final, target - nums[i]);
    final.pop(nums[i]);
  }

  subsetSum(nums, i + 1, final, target);
}
const arr2 = [1, 2, 1];

//algo 3
//most of the priblem will be solved by this approach
//try just setting this at start ''/aabc
/*

  ''/abc

  a/bc   /bc like this take not take but you can use this to solve many things


  like dice question

  ''/4

  1/3  2/2 3/1 4/0











*/

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

//Infinte supply keep one thing in mind whenever there is infinite supply keep take at same index
/*


  nottake = f(i - 1, t)
  take = f(i, t - arr[i]) //here we remain at the same index





*/
