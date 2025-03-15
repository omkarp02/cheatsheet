class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function createBinaryTree() {
    const root = new TreeNode(5);
    root.left = new TreeNode(2);
    root.right = new TreeNode(4);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);

    return root;
}


// Example usage:
function largestBst(root) {
        
        
    let ans = -1
    
    
    function helper(root, min, max){
        
        if(root === null){
            return {isBst: true, count: 0}
        }
        
        
        const left = helper(root.left, min, root.value)
        const right = helper(root.right, root.value, max)
        
        let count = 0
        
        if(left.isBst  && right.isBst){
            count = left.count + right.count + 1
        }
        
        ans = Math.max(count, ans)
        
        
        return  {isBst: left.isBst  && right.isBst && root.value > min && root.value < max, count: count}
        
    }
    
    helper(root, -Infinity, Infinity)
    return ans
    
}
const rootNode = createBinaryTree();
console.log(largestBst(rootNode))
