// Ceil in a Binary Search Tree
function ceilBinarySearchTree(root, val) {
  let ceil = root;
  while (root) {
    if (root.val === val) {
      return root;
    } else if (val < root.val) {
      ceil = root;
      root = root.left;
    } else {
      root = root.right;
    }
  }

  return ceil;
}

// Floor in a Binary Search Tree
function floorBinarySearchTree(root, val) {
  let floor = root;
  while (root) {
    if (root.val === val) {
      return root;
    } else if (val < root.val) {
      root = root.left;
    } else {
      floor = root;
      root = root.right;
    }
  }

  return floor;
}

// Insert a given Node in Binary Search Tree
//here like start from root node and start compare till you find a suitable position
function insertIntoBST(root, val) {
  let parent = null;
  let cur = root;

  const newnode = new Node(val);

  while (cur) {
    parent = cur;
    if (val < cur.val) {
      cur = cur.left;
    } else {
      cur = cur.right;
    }
  }

  if (parent === null) return newnode;
  if (val < parent.val) parent.left = newnode;
  else parent.right = newnode;

  return root;
}

// Delete a Node in Binary Search Tree
var deleteNode = function (root, key) {
  if (root === null) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left);
  } else if (key > root.val) {
    root.right = deleteNode(root.right);
  } else {
    if (root.left === null) return right;
    if (root.right === null) return left;
    root.data = minVal(root.right);
    root.right = deleteNode(root.right, root.data);
  }

  return root;
};

function minVal(root) {
  let cur = root;
  while (cur.left !== null) {
    cur = cur.left;
  }
  return cur.val;
}

// Find K-th smallest/largest element in BST
//can be done by inorder
var kthSmallest = function (root, k) {
  let ans = null;
  const helper = (node) => {
    if (node === null) {
      return null;
    }

    helper(node.left);
    k -= 1;
    if (k === 0 && ans === null) {
      ans = node.val;
      return;
    }
    helper(node.right);
  };
  helper(root);
  return ans;
};

// Check if a tree is a BST or BT
//here you need to keep track of low bound and upper bound using min max algo
var isValidBST = function (root) {
  function helper(root, greaterThan, lessThan) {
    if (!(root.val > greaterThan && root.val < lessThan)) {
      return false;
    }

    return helper(root.left, greaterThan, root.val) && helper(root.left);
  }
  helper(root, Number.NEGATIVE_INFINITY, Infinity);
};

// LCA in Binary Search Tree
//this we don't solve like bt lca we use bst property to solve this by comparing p and q at every node
var lowestCommonAncestor = function (root, p, q) {
  if (root === null) {
    return null;
  }

  if (p > root.val && q > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  } else if (p < root.val && q < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  } else {
    return root;
  }
};

// Construct a BST from a preorder traversal
//better convert the preorder to inorder by sroting it as inorder sorted is the binary tree
//keep upper boudn and lower boudn and keep constructing a binary tree using the min max algo
//here very important thing i should be passed as reference like once that the node on that index is set it can't be set again so we need to move forward for next index that is whay always pass as refernce so we set node once move to next node like that in every recursion

var bstFromPreorder = function (preorder) {
  function helper(preorder, i, ubound) {
    const cur = preorder[i[0]];

    if (preorder.length === i[0] || cur > ubound) {
      return null;
    }

    const newnode = new TreeNode(cur);
    i[0]++;

    newnode.left = helper(preorder, i, cur);

    newnode.right = helper(preorder, i, ubound);

    return newnode;
  }

  const r = [0];
  return helper(preorder, r, Infinity);
};

// Inorder Successor/Predecessor in BST
//for inorder success just find the ceil of that val done


// Binary Search Tree Iterator

var BSTIterator = function (root, isReverse) {
  this.stack = [];
  this.pushAll(root);
};

BSTIterator.prototype.next = function () {
  const node = this.stack.pop();
  this.pushAll(node.right);
  return node.val;
};

BSTIterator.prototype.pushAll = function () {
  while (root) {
    this.stack.push(root);
    root = root.left;
  }
};

BSTIterator.prototype.hasNext = function () {
  return this.stack.length;
};

// Two Sum In BST | Check if there exists a pair with Sum K
//better find inorder traversal and store in array, start traversing from start and end
//This same from can be solved using the bst iterrot keep two iterator one that iterate from start and one from end and apply the same logic

// Recover BST | Correct BST with two nodes swapped
//this was easy your were able to do yourself
//find the inorder store in array and again travese the tree and placing the correct inorder
//my intuition keep a upper and lowerbound and find the incorrect one and swap so basically find element which is less than previous or a element which previous is less so the preious element is in violation so two cases here

// Largest BST in Binary Tree
//this one try doing yourself
//find the smallest from left and largest from right

//hthis you have different formula by min max and able to solve youself

//striver way is same as my but he use postorder traversal so calcular left min max and right min and max then comparet to the cur node

// [small, large, node]
function findLargestBST(root) {
  if (root === null) {
    return [Infinity, Number.NEGATIVE_INFINITY, 0];
  }

  const left = findLargestBST(root.left);
  const right = findLargestBST(root.right);

  if (left[1] < root.val && right[0] > root.val) {
    return [Math.min(left[0], root.val), Math.max(root.val, right[1]), Math.max(left[2], right[2]) + 1];
  }

  return [Number.NEGATIVE_INFINITY, Infinity, Math.max(left[2], right[2])];
}

//Two Sum In BST | Check if there exists a pair with Sum K
//this can be done by iterator and then 2 pointer like method


