// Height of a Binary Tree

var maxDepth = function (root) {
  if (root === null) {
    return 0;
  }

  const left = maxDepth(root.left);
  const right = maxDepth(root.right);

  return Math.max(left, right) + 1;
};

// Check if the Binary tree is height-balanced or not
//was easy you were able to do yourself
//this you were able to do yourself
var isBalanced = function (root) {
  if (root === null) return true;

  return isBalancedHlp(root) ? true : false;
};

var isBalancedHlp = function (root) {
  if (root === null) {
    return 0;
  }

  const left = isBalancedHlp(root.left);
  const right = isBalancedHlp(root.right);

  if (left === false || right === false) {
    return false;
  }

  if (Math.abs(left - right) > 1) {
    return false;
  }

  return Math.max(left, right) + 1;
};

// Diameter of Binary Tree
//this you were able to do yourself

var diameterOfBinaryTree = function (root) {
  let max = 0;
  function maxDepth(root) {
    if (root === null) {
      return 0;
    }

    const left = maxDepth(root.left);
    const right = maxDepth(root.right);

    max = Math.max(left + right, max);

    return Math.max(left, right) + 1;
  }

  maxDepth(root);
  return max;
};

// Maximum path sum
//This you were able to do yourself this does not work for negative
//for negative just basically don't consider negative value from left and right mark them as zero

let max = 0;
var maxPathSum = function (root) {
  if (root === null) {
    return 0;
  }

  const left = maxPathSum(root.left); //here add Math.max(0, maxPathSumHlp(root.left)) to for negative issue
  const right = maxPathSum(root.right); //here add Math.max(0, maxPathSumHlp(root.left)) to for negative issue

  max = Math.max(max, left + right + root.val);

  return Math.max(left, right) + root.val;
};

// Check if two trees are identical or not
//easy but try coding this yourself one time
var isSameTree = function (p, q) {
  if (p === null || q === null) {
    return p === q;
  }

  return (
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  );
};

// Zig Zag Traversal of Binary Tree

var zigzagLevelOrder = function (root) {
  const queue = [];
  queue.push(root);
  queue.push(null);
  const result = [];
  let cur = [];
  let printReverse = false;

  while (queue.length !== 0) {
    const node = queue.shift();

    if (node === null) {
      printReverse = !printReverse;
      queue.push(null);
      if (printReverse) {
        cur.reverse();
      }
      result.push([...cur]);
      cur = [];
      continue;
    }

    cur.push(node.val);

    if (node.left) {
      queue.push(node.left);
    }

    if (node.right) {
      queue.push(node.right);
    }
  }

  return result;
};

// Boundary Traversal of Binary Tree
//this is easy boundary order traversal clockwise
//print the left boundary excluding the leaf node using level order
//print all the leaf node using inorder
//print all the right in reverse means store in stack first than reverse it

class Solution {
  // Function to check if a node is a leaf
  isLeaf(root) {
    return !root.left && !root.right;
  }

  // Function to add the left boundary of the tree
  addLeftBoundary(root, res) {
    let curr = root.left;
    while (curr) {
      // If the current node is not a leaf, add its value to the result
      if (!this.isLeaf(curr)) {
        res.push(curr.data);
      }
      // Move to the left child if it exists, otherwise move to the right child
      if (curr.left) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }
  }

  // Function to add the right boundary of the tree
  addRightBoundary(root, res) {
    let curr = root.right;
    let temp = [];
    while (curr) {
      // If the current node is not a leaf, add its value to a temporary vector
      if (!this.isLeaf(curr)) {
        temp.push(curr.data);
      }
      // Move to the right child if it exists, otherwise move to the left child
      if (curr.right) {
        curr = curr.right;
      } else {
        curr = curr.left;
      }
    }
    // Reverse and add the values from the temporary vector to the result
    for (let i = temp.length - 1; i >= 0; --i) {
      res.push(temp[i]);
    }
  }

  // Function to add the leaves of the tree
  addLeaves(root, res) {
    // If the current node is a leaf, add its value to the result
    if (this.isLeaf(root)) {
      res.push(root.data);
      return;
    }
    // Recursively add leaves of the left and right subtrees
    if (root.left) {
      this.addLeaves(root.left, res);
    }
    if (root.right) {
      this.addLeaves(root.right, res);
    }
  }

  // Main function to perform the boundary traversal of the binary tree
  printBoundary(root) {
    let res = [];
    if (!root) {
      return res;
    }
    // If the root is not a leaf, add its value to the result
    if (!this.isLeaf(root)) {
      res.push(root.data);
    }

    // Add the left boundary, leaves, and right boundary in order
    this.addLeftBoundary(root, res);
    this.addLeaves(root, res);
    this.addRightBoundary(root, res);

    return res;
  }
}

let solution = new Solution();
let result = solution.printBoundary(root);

// Vertical Order Traversal of Binary Tree
// you can find the created tree in exampletree file

function verticalOrderTraversal(root) {
  let q = [];
  q.push([root, 0, 0]);
  const map = {};

  while (q.length > 0) {
    let size = q.length;
    for (let i = 0; i < size; i++) {
      let [node, dist, level] = q.shift();

      if (map[dist]) {
        map[dist].push(node.val);
      } else {
        map[dist] = [node.val];
      }

      if (node.left !== null) {
        q.push([node.left, dist - 1, level + 1]);
      }
      if (node.right !== null) {
        q.push([node.right, dist + 1, level + 1]);
      }
    }
  }

  return map;
}

// Top View of Binary Tree
//top view is as simple as vertical order travel so did'nt did it

// Bottom View of Binary Tree
//bottom view is as simple as vertical order travel so did'nt did it

// Right/Left View of Binary Tree
function leftView(root) {
  const map = {};
  leftViewHlp(root, 0, map);
  return map;
}

function leftViewHlp(root, level, map) {
  if (root === null) return;

  if (!map[level]) {
    map[level] = root.val;
  }

  leftViewHlp(root.left, level + 1, map);
  leftViewHlp(root.right, level + 1, map);
}

// Symmetric Binary Tree
function isSymmetric(root) {
  const left = root.left;
  const right = root.right;
  return isSymmetricHlp(left, right);
}

function isSymmetricHlp(left, right) {
  if (left === null || right === null) {
    console.log(left, right);
    return left === right;
  }

  if (left.val !== right.val) {
    return false;
  }

  return (
    isSymmetricHlp(left.left, right.right) &&
    isSymmetricHlp(left.right, right.left)
  );
}

