class TreeNode {
  constructor(val = 0, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
  }
}

// Creating the tree as shown in the image
const root = new TreeNode(0);
root.left = new TreeNode(0);
root.right = new TreeNode(0);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(0);


var distributeCoins = function(root) {
  let res = 0
  function helper(cur){
    if(cur === null){
      return [0, 0]
    }

    const [l_size, l_coins] = helper(cur.left)
    const [r_size, r_coins] = helper(cur.right)

    const size = 1 + l_size + r_size
    const coins = cur.val + l_coins + r_coins
    res += Math.abs(size - coins)
    return [size, coins]
  }

  helper(root)
  return res
};

console.log(distributeCoins(root))