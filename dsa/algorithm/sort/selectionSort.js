/*

    How to solve

    1. Select the largest element and put it at its correct index

    Things to know

    1. Not stable 
    
    Use case

    1. Perform well on small list


*/

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    const indexToSwap = arr.length - 1 - i;
    let maxIndex = 0;
    for (let j = 1; j < arr.length - i; j++) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j;
      }
    }
    swap(indexToSwap, maxIndex, arr);
  }
  return arr;
}

const arr = [4, 5, 1, 2, 3];

console.log(selectionSort(arr));

function swap(first, second, arr) {
  let temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
}
