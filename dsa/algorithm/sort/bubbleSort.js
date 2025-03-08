/*
  this you were able to solve
    How to solve

    1. compare first two element is first element greater than second if yes than swap
    2. if we do this the greatest element will be at the last of the array list
    3. and rest you can figure out
    4. if you don't figure out here is than do the same thing for the 
        n - 2 array than for n - 3 and so on till whole array is sorted

     
    5. This is the first step

        3 1 5 4 2
        1 3 5 4 2
        1 3 4 5 2
        1 3 4 2 5

    Things to Note

    1. Here it maintain the sort order and this is stable sorting algorithm

*/

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j + 1] < arr[j]) {
        swap(j + 1, j, arr);
      }
    }
  }
  return arr
}

const arr = [3, 1, 5, 4, 2];

console.log(bubbleSort(arr))

function swap(first, second, arr) {
  let temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
}
