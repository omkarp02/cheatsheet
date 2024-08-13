class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function insertLevelOrder(arr, root, i) {
  if (i < arr.length) {
    let temp = new TreeNode(arr[i]);
    root = temp;

    // insert left child
    root.left = insertLevelOrder(arr, root.left, 2 * i + 1);

    // insert right child
    root.right = insertLevelOrder(arr, root.right, 2 * i + 2);
  }
  return root;
}

// Example usage:
const arr = [1, 2, 3, 4, 5, 6, 7];
let root = insertLevelOrder(arr, null, 0);

// Preorder Traversal of Binary Tree
//was easy did'nt do it

// Inorder Traversal of Binary Tree
//was easy did'nt do it

// Post-order Traversal of Binary Tree
//was easy did'nt do it

// Level order Traversal / Level order traversal in spiral form

function levelOrder(root) {
  let ans = [];
  if (!root) {
    return ans;
  }
  let q = [];
  q.push(root);

  while (q.length > 0) {
    let size = q.length;
    let level = [];

    for (let i = 0; i < size; i++) {
      let node = q.shift();
      level.push(node.val);

      if (node.left !== null) {
        q.push(node.left);
      }
      if (node.right !== null) {
        q.push(node.right);
      }
    }
    ans.push(level);
  }
  return ans;
}

console.log(levelOrder(root));

// Iterative Inorder Traversal of Binary Tree
//This one time try doing it yourself you were not able to do this
var inorderTraversal = function (root) {
  let node = root;
  const stack = [];
  const result = [];

  while (true) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      if (stack.length === 0) break;
      const cur = stack.pop();
      result.push(cur.val);
      node = cur.right;
    }
  }

  return result;
};

// Iterative Preorder Traversal of Binary Tree

var preorderTraversal = function (root) {
  let node = root;
  const stack = [];
  const result = [];

  while (true) {
    if (node) {
      result.push(node.val);
      stack.push(node);
      node = node.left;
    } else {
      if (stack.length === 0) break;
      const cur = stack.pop();

      node = cur.right;
    }
  }

  return result;
};

// Post-order Traversal of Binary Tree using 2 stack

// Post-order Traversal of Binary Tree using 1 stack

// Preorder, Inorder, and Postorder Traversal in one Traversal
