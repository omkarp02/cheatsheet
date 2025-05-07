class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Add a node to the end of the list
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // Insert a node at a specific position
  insert(data, index) {
    if (index < 0 || index > this.size) {
      return false;
    }
    const newNode = new Node(data);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      let previous = null;
      let currentIndex = 0;
      while (currentIndex < index) {
        previous = current;
        current = current.next;
        currentIndex++;
      }
      newNode.next = current;
      previous.next = newNode;
    }
    this.size++;
    return true;
  }

  // Remove a node at a specific position
  remove(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    let removedNode;
    if (index === 0) {
      removedNode = this.head;
      this.head = this.head.next;
    } else {
      let current = this.head;
      let previous = null;
      let currentIndex = 0;
      while (currentIndex < index) {
        previous = current;
        current = current.next;
        currentIndex++;
      }
      removedNode = current;
      previous.next = current.next;
    }
    this.size--;
    return removedNode.data;
  }

  // Get the data at a specific index
  get(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    let current = this.head;
    let currentIndex = 0;
    while (currentIndex < index) {
      current = current.next;
      currentIndex++;
    }
    return current;
  }

  // Print the list
  print(head) {
    let current = head;
    let result = "";
    while (current) {
      result += current.data + " -> ";
      current = current.next;
    }
    result += "null";
    console.log(result);
  }
}

const ll = new LinkedList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.append(4);
ll.append(5);

function reverseKthNodee(head, k) {
  const size = getSize(head);
  let timesToReverse = Math.floor(size / k);
  let noOfNodesToReverse = k;
  let prev = null;
  let cur = head;
  let next = head.next;
  let first = cur;
  let second = null;
  let newHead = null;
  while (timesToReverse && cur) {
    if (noOfNodesToReverse === 0) {
      timesToReverse--;
      if (first && second) {
        first.next = prev;
        first = second;
        second = cur;
      } else if (first) {
        newHead = prev;
        second = cur;
      }
      noOfNodesToReverse = k;
    }
    cur.next = prev;
    prev = cur;
    cur = next;
    if (next) {
      next = next.next;
    }

    noOfNodesToReverse--;
  }

  if (timesToReverse) {
    timesToReverse--;
    if (first && second) {
      first.next = prev;
      first = second;
      second = cur;
    } else if (first) {
      newHead = prev;
      second = cur;
    }
    first.next = null
    noOfNodesToReverse = k;
  }else {
    first.next = prev
    prev.next = null
  }

  return newHead;
}

function getSize(head) {
  let count = 0;
  let temp = head;
  while (temp !== null) {
    count++;
    temp = temp.next;
  }
  return count;
}

const asdf = reverseKthNodee(ll.head, 2);

ll.print(asdf);
