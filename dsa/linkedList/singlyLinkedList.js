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

// Middle of a LinkedList
//Find middle of linkedlist
function findMiddle(head) {
  let slow = head;
  let fast = head;
  let prev = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    prev = slow;
    slow = slow.next;
  }

  return prev;
}

// Remove Nth node from the back of the LL
//This can be solved somewhat using slow and fast pointer

function removeNthNode(head, n) {
  let slow = head;
  let fast = head;

  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }

  if (fast === null) {
    return head.next;
  }

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next;
  }

  slow.next = slow.next.next;
  return head;
}

// ll.print(ll.head)
// const newHead = removeNthNode(ll.head, 8)
// ll.print(newHead)

//Delete the middle node of LL
//This you could have solved easily so not done it
var deleteMiddleNode = function (head) {
  if (head === null || head.next === null) {
    return null;
  }

  // Initialize slow and fast pointers
  let slow = head;
  let fast = head;
  fast = head.next.next;

  // Move 'fast' pointer twice as fast as 'slow'
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Delete the middle node by skipping it
  slow.next = slow.next.next;
  return head;
};

//Sort LL
//Here you can do merge and everything just see how to merge the linked list
var sortList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }

  const leftNode = head;
  const midPrev = findMiddle(head);
  const rightNode = midPrev.next;

  midPrev.next = null;

  const leftHead = sortList(leftNode);
  const rightHead = sortList(rightNode);

  return mergeLinkedListHlp(leftHead, rightHead);
};

var mergeLinkedListHlp = function (leftNode, rightNode) {
  const dummyNode = new Node(-1);
  let temp = dummyNode;

  while (leftNode !== null && rightNode !== null) {
    if (leftNode.data < rightNode.data) {
      temp.next = leftNode;
      leftNode = leftNode.next;
    } else {
      temp.next = rightNode;
      rightNode = rightNode.next;
    }
    temp = temp.next;
  }

  if (leftNode !== null) {
    temp.next = leftNode;
  }

  if (rightNode !== null) {
    temp.next = rightNode;
  }

  return dummyNode.next;
};

// ll.print(ll.head)
// const newHead = sortList(ll.head)
// ll.print(newHead)

//Sort a LL of 0's 1's and 2's by changing links
//once check this brute force or try brute force yourself datareplacement
//optimal split the 0 1 and 2 and then combine

function sort012Ll(head) {
  let zeroHead = new Node(-1);
  let oneHead = new Node(-1);
  let twoHead = new Node(-1);
  const newHead = zeroHead;
  const oneHeadTemp = oneHead;
  const twoHeadTemp = twoHead;

  let temp = head;
  while (temp !== null) {
    if (temp.data === 0) {
      zeroHead.next = temp;
      zeroHead = zeroHead.next;
    } else if (temp.data === 1) {
      oneHead.next = temp;
      oneHead = oneHead.next;
    } else {
      twoHead.next = temp;
      twoHead = twoHead.next;
    }
    temp = temp.next;
  }

  zeroHead.next = null;
  oneHead.next = null;
  twoHead.next = null;

  zeroHead.next = oneHeadTemp.next;
  oneHead.next = twoHeadTemp.next;

  return newHead.next;
}

// const newHead = sort012Ll(ll.head);
// ll.print(newHead);

//Find the intersection point of Y LL
//Bruteforce using hashmap trace one then find if same node is present in second
//Better approach find the length of both the linkedlist move the bigger length linked list by the difference and now travse both linked list eksath and find the intersection
//Optimal the intuition is amazing you keeping moving them eksath then when it reach end you move the point to another linked list and keep moving so figure out the intuition from this

//This code that i wrote is working fine here but not working in leetcode for that check the striver code
var getIntersectionNode = function (headA, headB) {
  let tempA = headA;
  let tempB = headB;

  while (tempA !== tempB) {
    if (tempA.next === null) {
      tempA = headB;
    } else {
      tempA = tempA.next;
    }

    if (tempB.next === null) {
      tempB = headA;
    } else {
      tempB = tempB.next;
    }
  }

  return tempB.data;
};

const llOne = new LinkedList();
llOne.append(4);
llOne.append(1);

const llTwo = new LinkedList();
llTwo.append(5);
llTwo.append(6);
llTwo.append(1);

const llThree = new LinkedList();
llThree.append(8);
llThree.append(4);
llThree.append(5);

llOne.get(1).next = llThree.head;
llTwo.get(2).next = llThree.head;

// console.log(getIntersectionNode(llOne.head, llTwo.head))

//Add 1 to a number represented by LinkedList
//better reverse the linkedlist and add
// Reverse a LinkedList [Recursive]
//optimal recursion


function addOneToNumberLL(head) {
  const temp = head;
  const carry = addHelper(temp);
  if (carry === 1) {
    const newHead = new Node(1);
    newHead.next = head;
    return newHead;
  }
  return head;
}

function addHelper(head) {
  if (head === null) {
    return 1;
  }

  const carry = addHelper(head.next);
  const newVal = head.data + carry;
  head.data = newVal % 10;
  return head.data === 0 ? 1 : 0;
}

// ll.print(ll.head);
// const newHead = addOneToNumberLL(ll.head);
// console.log(ll.print(newHead));

//Add 2 numbers in LL
//This you did by yourself
var addTwoNumbers = function (l1, l2) {
  let temp1 = l1;
  let temp2 = l2;
  const dummyNode = new Node(-1);
  let addList = dummyNode;
  let carry = 0;

  while (temp1 !== null && temp2 !== null) {
    const sum = temp1.data + temp2.data + carry;

    if (sum.toString().length > 1) {
      carry = 1;
      addList.next = new Node(sum % 10);
    } else {
      carry = 0;
      addList.next = new Node(sum);
    }

    temp1 = temp1.next;
    temp2 = temp2.next;
    addList = addList.next;
  }

  let remainingTemp = temp1 !== null ? temp1 : temp2;
  while (remainingTemp !== null) {
    let sum = remainingTemp.data + carry;
    if (sum === 10) {
      carry = 1;
      addList.next = new Node(0);
    } else {
      carry = 0;
      addList.next = new Node(sum);
    }

    remainingTemp = remainingTemp.next;
    addList = addList.next;
  }

  if (carry === 1) {
    addList.next = new Node(1);
  }

  return dummyNode.next;
};

const oneNumber = new LinkedList();
oneNumber.append(9);
oneNumber.append(9);
oneNumber.append(9);
oneNumber.append(9);
oneNumber.append(9);
oneNumber.append(9);
oneNumber.append(9);
oneNumber.append(9);

const secondNumber = new LinkedList();
secondNumber.append(9);
secondNumber.append(9);
secondNumber.append(9);
secondNumber.append(9);

// const newHead = addTwoNumbers(oneNumber.head, secondNumber.head)
// ll.print(newHead)

// Reverse LL in group of given size K
//This you can do please try this one put 15min in diagram and thing and do this yourself
//This look kindly or try it yourself
function reverseKthNode(head, k) {
  let prev = null;
  let cur = head;
  let next = head.next;
  let last = cur;
  let newLast = null;
  let count = k;
  let newHead = null;

  while (cur !== null) {
    if (count === 0) {
      if (newLast) {
        newLast.next = prev;
      } else {
        newHead = prev;
      }
      newLast = last;
      last = cur;
      count = k;
    }

    cur.next = prev;
    prev = cur;
    cur = next;
    if (next) {
      next = next.next;
    }
    count -= 1;
  }

  newLast.next = prev;
  last.next = null;

  console.log(newHead);
  return newHead;
}

ll.print(ll.head);
const newHead = reverseKthNode(ll.head, 2);
ll.print(newHead);

//Rotate a LL
//This seems easy you did't do it
//find the length and point the tail to heads
//find the difference using module and set the next as null

// Flattening of LL
//This was easy you were able to figure it out

//Clone a Linked List with random and next pointer
//Better This can be one using the hasmap
//Optimal changing the structure of linkedlist
//1 point to another 1 then 2 point to another 2
//1 => 1 => 2 => 2 => 3 => so on
//see the optimal solution one time

const copyRandomList = function (head) {
  const cur = head;

  while (cur !== null) {
    const temp = cur.next;
    cur.next = new Node(cur.data);
    cur.next.next = temp;
    cur = temp;
  }
  cur = head;

  while (cur !== null) {
    if (cur.next !== null) {
      cur.next.random = cur.random !== null ? cur.random.next : null;
    }

    cur = cur.next.next;
  }

  let org = head;
  let copy = head.next;

  let temp = copy;

  while (org !== null) {
    org.next = org.next.next;
    temp.next = temp.next.next;

    org = org.next;
    temp = temp.nexxt;
  }

  return copy;
};

	
// Detect a loop in LL
var hasCycle = function(head) {
  let fast = head
  let slow = head

  while(fast !== null && fast.next !== null){
      fast = fast.next.next
      slow = slow.next
      if(fast === slow) return true
  }

  return false

};

//Remove Duplicates in a sorted Linked List
//this was easy did'nt do it

//Remove Duplicates in a Un-sorted Linked List.
//you can use hashmap to do this

//Intersection of two Sorted Linked List.
// This was easy did't do it can be done using 2 pointer
