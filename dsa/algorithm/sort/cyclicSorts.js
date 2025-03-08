/*
  this you were able to solve
  cyclic sort
  check if current index have correct number like here
  3 2 1 4 5 
  so 1 index should have 1 but it have 3 so move 3 to correct index


  Problem it solves

  Find duplicate in an array of N+1 Integers

*/


function cyclicSort(nums) {
  let i = 0
  while(i < nums.length){
    const curEle = nums[i]
    if(curEle === nums[curEle - 1]){
      i++
    }else{
      swap(i, curEle - 1, nums)
    }
  }
  return nums
}

function swap(first, second, arr) {
  let temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
}


const arr5 = [3, 1, 3, 4, 2];
console.log(cyclicSort(arr5));
