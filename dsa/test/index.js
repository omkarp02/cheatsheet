class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Build full tree
const root = new TreeNode(1);

root.left = new TreeNode(2);
root.right = new TreeNode(3);

root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

root.left.left.left = new TreeNode(8);
root.left.left.right = new TreeNode(9);

root.left.right.left = new TreeNode(10);
root.left.right.right = new TreeNode(11);

root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

var flatten = function(root) {
    

    


};