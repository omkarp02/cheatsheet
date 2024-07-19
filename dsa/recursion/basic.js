function reverseAnArray(arr, i, j) {
  if (i >= j) {
    return arr;
  }

  swap(i, j, arr);

  return reverseAnArray(arr, i + 1, j - 1);
}
const arr = [1, 2, 3, 4, 5];
// console.log(reverseAnArray(arr, 0, arr.length - 1));

function checkPalidrome(str, i) {
  if (i === Math.floor(str.length - 1)) {
    return true
  }

  if (str[i] !== str[str.length - 1 - i]) {
    return false;
  }

  return checkPalidrome(str, i + 1);
}

const str = "toooot";

console.log(checkPalidrome(str, 0));

function swap(first, second, arr) {
  let temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
}
