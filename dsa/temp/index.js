//LinkedList

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
ll.append(6);

// Middle of a LinkedList [TortoiseHare Method]

var middleNode = function (head) {
  const temp = head;
  let slow = temp;
  let fast = temp;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow.data;
};

// console.log(middleNode(ll.head));

// Reverse a LL [Recursive]
//Here you have difficulty returning the head so once try reversing recursevly while returning the new head
var reverseListRec = function (head) {
  if (head.next === null || head === null) {
    return head;
  }

  const newHead = reverseListRec(head.next);
  const nextNode = head.next;
  nextNode.next = head;
  head.next = null;
  return newHead;
};

// const newHead = reverseListRec(ll.head)
// ll.print(newHead)

// Reverse a LinkedList [Iterative]
var reverseList = function (head) {
  let prev = null;
  let cur = head;
  let next = head.next;

  while (next !== null) {
    cur.next = prev;
    prev = cur;
    cur = next;
    next = next.next;
  }

  cur.next = prev;
  return cur;
};

// const newHead = reverseList(ll.head);
// ll.print(newHead);

// Detect a loop in LL
var hasCycle = function (head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
};

// ll.print(ll.head)
// const lastNode = ll.get(ll.size - 1)
// const secondNode = ll.get(1)
// lastNode.next = secondNode

// console.log(hasCycle(ll.head))

// Find the starting point in LL
var detectCycle = function (head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }
  return -1;
};

// ll.print(ll.head);
// const lastNode = ll.get(ll.size - 1);
// const secondNode = ll.get(1);
// lastNode.next = secondNode;

// detectCycle(ll.head);

//Length of Loop in LL
const lengthOfLoop = function (head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let count = 0;
      do {
        slow = slow.next;
        count += 1;
      } while (fast !== slow);
      return count;
    }
  }
  return -1;
};

// Check if LL is palindrome or not
//This can be done using stack or reverse method
//Better stack
//optimal reverse

//Segrregate odd and even nodes in LL

var oddEvenList = function (head) {
  let odd = head;
  let even = head.next;
  const evenStart = head.next


  while (odd.next !== null && even.next !== null) {
    const oddNext = odd.next.next
    const evenNext = even.next.next
    odd.next = oddNext
    odd = oddNext
    even.next = evenNext;
    even = evenNext;
  }

  odd.next = null
  even.next = null

  odd.next = evenStart

  return head
};

// ll.print(ll.head)
// oddEvenList(ll.head)
// ll.print(ll.head)

/////////////////-----------------------------------------------------------------------------------------------------------------------------------------





