// Root to Node Path in Binary Tree
//This try doing yourself were not able to solve

function getPath(root, arr, x) {
  if (!root) {
    return false;
  }

  arr.push(root.val);

  if (root.val === x) {
    return true;
  }

  if (getPath(root.left, arr, x) || getPath(root.right, arr, x)) {
    return true;
  }

  arr.pop();
  return false;
}

const result = [];
// getPath(root, result, 7);

// LCA in Binary Tree
//were able to solve yourself

var lowestCommonAncestor = function (root, p, q) {
  if (root === null) {
    return false;
  }

  if (root.val === p || root.val === q) {
    return root;
  }

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root;

  if (left) return left;
  else return right;
};

// Maximum width of a Binary Tree
//start making tree like 1 2 3 you will find the intuition so we can go with this approach but what if tree is skew tree so it will go on
// like 1 2 4 8 16 and so on
//so you need to solve the issue of overflow
//watch from 7:26
//now you can do this by level order traversal

// Check for Children Sum Property
//understand the question and try yourself

function childrenSumProperty(root) {
  if (root === null) return;
  let child = 0;

  if (root.left) {
    child += root.left.val;
  }

  if (root.right) {
    child += root.right.val;
  }

  if (child >= root.val) root.val = child;
  else {
    if (root.left) root.left.val = root.val;
    if (root.right) root.right.val = root.val;
  }

  childrenSumProperty(root.left);
  childrenSumProperty(root.right);

  let total = 0;

  if (root.left) total += root.left.val;
  if (root.right) total += root.right.val;
  if (root.left || root.right) root.val = total;
}

// Print all the Nodes at a distance of K in a Binary Tree
//this you can find in graph series

// Minimum time taken to BURN the Binary Tree from a Node
//this you can find in graph series

// Count total Nodes in a COMPLETE Binary Tree

// Requirements needed to construct a Unique Binary Tree | Theory

// Construct Binary Tree from inorder and preorder

// Construct the Binary Tree from Postorder and Inorder Traversal

// Serialize and deserialize Binary Tree

// Morris Preorder Traversal of a Binary Tree

// Morris Inorder Traversal of a Binary Tree

// Flatten Binary Tree to LinkedList
