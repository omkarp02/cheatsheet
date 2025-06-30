var widthOfBinaryTree = function (root) {
  if (root === null) {
    return 1;
  }
  // [node, dist]
  let queue = [];
  queue.push([root, 0]);
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [cur, dist] = queue.shift();
      if(cur.left) queue.push([cur.left, 2 * dist + 1])
    }
  }
};
