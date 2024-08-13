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
  let printReverse = false

  while (queue.length !== 0) {
    const node = queue.shift();

    if (node === null) {
      printReverse = !printReverse
      queue.push(null);
      if(printReverse){
        cur.reverse()
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

// Vertical Order Traversal of Binary Tree

// Top View of Binary Tree

// Bottom View of Binary Tree

// Right/Left View of Binary Tree

// Symmetric Binary Tree
