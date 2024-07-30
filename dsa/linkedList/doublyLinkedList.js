class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Add a node to the end of the list
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  // Add a node to the beginning of the list
  prepend(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  // Insert a node at a specific position
  insert(data, index) {
    if (index < 0 || index > this.size) {
      return false;
    }
    if (index === 0) {
      this.prepend(data);
      return true;
    }
    if (index === this.size) {
      this.append(data);
      return true;
    }
    const newNode = new Node(data);
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    newNode.next = current.next;
    newNode.prev = current;
    current.next.prev = newNode;
    current.next = newNode;
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
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
    } else if (index === this.size - 1) {
      removedNode = this.tail;
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      let current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
      removedNode = current;
      current.prev.next = current.next;
      current.next.prev = current.prev;
    }
    this.size--;
    return removedNode.data;
  }

  // Get the data at a specific index
  get(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    let current;
    if (index <= this.size / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      current = this.tail;
      for (let i = this.size - 1; i > index; i--) {
        current = current.prev;
      }
    }
    return current.data;
  }

  // Print the list forward
  printForward(head) {
    let current = head ? head : this.head;
    let result = "";
    while (current) {
      result += current.data + " <-> ";
      current = current.next;
    }
    result += "null";
    console.log(result);
  }

  // Print the list backward
  printBackward() {
    let current = this.tail;
    let result = "";
    while (current) {
      result += current.data + " <-> ";
      current = current.prev;
    }
    result += "null";
    console.log(result);
  }
}

const dl = new DoublyLinkedList();
dl.append(1);
dl.append(2);
dl.append(3);
dl.append(4);
dl.append(5);
dl.append(6);

dl.printForward();

//Delete all occurrences of a key in DLL

function deleteAllOccurrenceOfKeyInDLL(head, key) {
  let prev = null;
  let newHead = head;

  while (newHead.data === key) {
    newHead = newHead.next;
    newHead.prev = null;
  }

  let cur = newHead;
  let next = newHead.next;

  while (cur !== null) {
    if (cur.data === key) {
      prev.next = next;
      cur = next;
      if (next) {
        next.prev = prev;
        next = next.next;
      }
    } else {
      prev = cur;
      cur = next;
      if (next) {
        next = next.next;
      }
    }
  }

  return newHead;
}

// const newHead = deleteAllOccurrenceOfKeyInDLL(dl.head, 10);

// dl.printForward(newHead);

//Find pairs with given sum in DLL
//This one was easy so did'nt do it

// Remove duplicates from sorted DLL
//This seems easy so did't do it

//Reverse LL in group of given size K
//This you can do but once check kunal kushwaha 2:41:20


