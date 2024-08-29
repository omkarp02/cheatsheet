// Introduction to Priority Queues using Binary Heaps

//heap is a complete binary tree
//node = i
// parent = i / 2
//left child = 2 * i
//right child = 2 * i + 1

// Min Heap and Max Heap Implementation

//insert is easy put the insert element in last of arry  and compare with it parent
//delete in heap alyways delete the root element so delete the root and put the last node to first means on root then start comparing from the start mean root to bottom and start swaping

class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  insert(val) {
    this.heap.push(val);
    const length = this.heap.length;
    if (length === 2) {
      return;
    }

    let i = length - 1;

    while (i > 1) {
      const parent = Math.floor(i / 2);
      if (val > this.heap[parent]) {
        this.swap(i, parent);
        i = parent;
      } else {
        return;
      }
    }
  }

  swap(first, second) {
    let temp = this.heap[first];
    this.heap[first] = this.heap[second];
    this.heap[second] = temp;
  }

  delete() {
    const length = this.heap.length;
    if (length === 1) return;
    if (length === 2) {
      this.heap.pop();
      return;
    }

    this.heap[1] = this.heap[length - 1];
    this.heap.pop();

    let i = 1;

    while (i < length - 1) {
      const maxChildIndex =
        this.heap[2 * i] > this.heap[2 * i + 1] ? 2 * i : 2 * i + 1;
      if (this.heap[i] < this.heap[maxChildIndex]) {
        this.swap(i, maxChildIndex);
        i = maxChildIndex;
      } else {
        return;
      }
    }
  }

  print() {
    console.log(this.heap);
  }
}

const maxHeap = new MaxHeap();
maxHeap.insert(4);
maxHeap.insert(43);
maxHeap.insert(2);
maxHeap.insert(8);
maxHeap.insert(10);
maxHeap.delete();

// maxHeap.print();

// Check if an array represents a min-heap or not
//this was easy was able to figure out

// Convert min Heap to max Heap
//this is easy understand the questoin ask few quesiton related to this

//Heap sort for this need to
//convert array to heap useing heapify => as you know the first element should be largest swap frist and last and call heapify again from first to second last keep doing so on

//this function convert the normal array to maxheap
//so this check if the i and tree below it is max heap if not it makes it
function heapify(arr, i, l) {
  let largest = i;
  let left = 2 * i;
  let right = 2 * i + 1;

  if (left <= l && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right <= l && arr[right] > arr[largest]) {
    largest = right;
  }

  if (i !== largest) {
    swap(arr, i, largest);
    heapify(arr, largest, l);
  }
}

function heapSort(arr, n) {
  for (let i = n - 1; i > 1; i--) {
    swap(arr, 1, i);
    heapify(arr, 1, i - 1);
  }
  return arr
}

function buildHeap(arr, n) {
  for (let i = Math.floor(n / 2); i > 0; i--) {
    heapify(arr, i, n);
  }

  return arr;
}

function swap(arr, first, second) {
  let temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
}

const arr = [null, 5, 3, 234, 7];
console.log(buildHeap(arr, arr.length));
console.log(heapSort(arr, arr.length))

