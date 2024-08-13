/*

//Vertical Order Traversal of Binary Tree
// Node structure for the binary tree
class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Creating a sample binary tree
const root = new Node(1);
root.left = new Node(2);
root.left.left = new Node(4);
root.left.right = new Node(10);
root.left.left.right = new Node(5);
root.left.left.right.right = new Node(6);
root.right = new Node(3);
root.right.right = new Node(10);
root.right.left = new Node(9);

// Root to Node Path in Binary Tree

class Node {
  constructor(x) {
    this.val = x;
    this.left = null;
    this.right = null;
  }
}

const root = new Node(3);
root.left = new Node(5);
root.right = new Node(1);
root.left.left = new Node(6);
root.left.right = new Node(2);
root.right.left = new Node(0);
root.right.right = new Node(8);
root.left.right.left = new Node(7);
root.left.right.right = new Node(4);


*/