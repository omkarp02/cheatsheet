//graph representation

// BFS
//were able to do yourself
function bfsTraversal(bfsGraph) {
  const vis = [];
  const queue = []; //only use shift and push

  for (let i = 0; i < bfsGraph.length; i++) {
    if (!vis[i]) {
      bfs(vis, i, bfsGraph, queue);
    }
  }
}

function bfs(vis, i, bfsGraph, queue) {
  queue.push(i);

  while (queue.length) {
    const cur = queue.pop();
    vis[cur] = true;

    for (let i = 0; i < bfsGraph[cur].length; i++) {
      const node = bfsGraph[cur][i];
      if (!vis[node]) {
        queue.push(node);
      }
    }
  }
}

const bfsGraph = [[1, 2, 3], [], [4], [], []];
// bfsTraversal(bfsGraph);

// DFS
//were able to do yourself
function dfsOfGraph(dfsGraph) {
  const vis = [];
  const queue = []; //only use shift and push

  for (let i = 0; i < dfsGraph.length; i++) {
    if (!vis[i]) {
      dfs(vis, i, dfsGraph, queue);
    }
  }
}

function dfs(vis, node, dfsGraph) {
  vis[node] = true;

  for (let i = 0; i < dfsGraph[node].length; i++) {
    const adNode = dfsGraph[node][i];
    if (!vis[adNode]) {
      dfs(vis, adNode, dfsGraph);
    }
  }
}

const dfsGraph = [[2, 3, 1], [0], [0, 4], [0], [2]];
// dfsOfGraph(dfsGraph);

// Number of provinces
//this was easy did sooled it
var findCircleNum = function (isConnected) {
  const nodes = isConnected[0].length;
  const graph = {};
  //Initialize a graph
  for (let i = 0; i < nodes; i++) {
    graph[i] = [];
  }
  for (let i = 0; i < isConnected.length; i++) {
    for (let j = 0; j < nodes; j++) {
      if (isConnected[i][j]) {
        graph[i].push(j);
      }
    }
  }

  //Basic depth first search helper method
  const dfs = (startNode) => {
    visited[startNode] = true;
    for (let neighbor of graph[startNode]) {
      if (!visited[neighbor]) {
        dfs(neighbor);
      }
    }
  };
  let visited = {};
  let ans = 0;

  //if the graph would be connected all the nodes would be visited in one go
  //every time the dfs starts again increement the count
  for (let i = 0; i < nodes; i++) {
    if (!visited[i]) {
      ans = ans + 1;
      dfs(i);
    }
  }
  return ans;
};

const isConnected = [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1],
];
//   console.log(findCircleNum(isConnected));

// Connected Components Problem in Matrix

// Rotten Oranges
//this you can solve yourself but if there are two rotten then push both of them in queue
// [row, col, level]
var orangesRotting = function (grid) {
  const delrow = [-1, 0, +1, 0];
  const delcol = [0, +1, 0, -1];

  const queue = [];
  const vis = [];
  let noOfOrangeToRot = 0;

  for (let row = 0; row < grid.length; row++) {
    vis.push([]);
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 2) {
        queue.push([row, col, 0]);
        vis[row][col] = true;
      } else {
        vis[row][col] = false;
      }

      if (grid[row][col] === 1) {
        noOfOrangeToRot += 1;
      }
    }
  }

  let maxTime = 0;

  //here bfs starts
  while (queue.length) {
    const [row, col, level] = queue.shift();

    vis[row][col] = true;

    if (grid[row][col] === 1) {
      noOfOrangeToRot -= 1;
    }

    maxTime = Math.max(level, maxTime);

    for (let i = 0; i < 4; i++) {
      let nrow = row + delrow[i];
      let ncol = col + delcol[i];

      if (
        nrow >= 0 &&
        ncol >= 0 &&
        nrow < grid.length &&
        ncol < grid[nrow].length &&
        vis[nrow][ncol] === false &&
        grid[nrow][ncol] === 1
      ) {
        vis[nrow][ncol] = true;
        queue.push([nrow, ncol, level + 1]);
      }
    }
  }

  return noOfOrangeToRot === 0 ? maxTime : -1;
};

const orangeGrid = [
  [0, 1, 2],
  [0, 1, 1],
  [2, 1, 1],
];

orangesRotting(orangeGrid);

// Flood fill

// [up, right, down, left]
var floodFill = function (image, sr, sc, color) {
  const delrow = [-1, 0, +1, 0];
  const delcol = [0, +1, 0, -1];
  let iniColor = image[sr][sc];

  if (color === iniColor) {
    return image;
  }

  function dfs(row, col) {
    image[row][col] = color;

    for (let i = 0; i < 4; i++) {
      let nrow = row + delrow[i];
      let ncol = col + delcol[i];

      if (
        nrow >= 0 &&
        ncol >= 0 &&
        nrow < image.length &&
        ncol < image[nrow].length &&
        image[nrow][ncol] === iniColor
      ) {
        dfs(nrow, ncol);
      }
    }
  }

  dfs(sr, sc);

  return image;
};
const floodFillArr = [
  [1, 1, 1],
  [2, 2, 0],
  [2, 2, 2],
];

const floodSrc = [2, 0];
const color = 3;

floodFill(floodFillArr, floodSrc[0], floodSrc[1], color);

// Cycle Detection in unirected Graph (bfs)
//was able to solve myself
//here in bfs make sure you use parent
function detectUndirectedGraphInBFS(graph) {
  const queue = [];
  const vis = [];
  const parent = [];

  for (let _ of graph) {
    vis.push(false);
    parent.push(-1);
  }

  queue.push(1);
  vis[1] = true;

  while (queue.length) {
    const cur = queue.shift();

    for (let adj of graph[cur]) {
      if (vis[adj] === false) {
        vis[adj] = true;
        parent[adj] = cur;
        queue.push(adj);
      } else if (parent[cur] !== adj) {
        return true;
      }
    }
  }

  return false;
}

const graph = [[], [2, 3], [1, 5], [1, 4, 6], [3], [2, 7], [3, 7], [5, 6]];

// detectUndirectedGraphInBFS(graph);

// Cycle Detection in undirected Graph (dfs)
//here in dfs make sure you use parent
function detectUndirectedGraphInDFS(graph) {
  const vis = [];
  const parent = [];

  for (let _ of graph) {
    vis.push(false);
    parent.push(-1);
  }

  function dfs(node, vis) {
    vis[node] = true;

    for (let adj of graph[node]) {
      if (vis[adj] === false) {
        parent[adj] = node;
        dfs(adj, vis);
      } else if (parent[node] !== adj) {
        return true;
      }
    }
  }

  return dfs(1, vis);
}

const graph2 = [[], [2, 3], [1, 5], [1, 4, 6], [3], [2, 7], [3, 7], [5, 6]];

// console.log(detectUndirectedGraphInDFS(graph2));

// 0/1 Matrix (Bfs Problem)
//here see the 1 and find the nearest zero
//this was similiar did'nt do it

// Surrounded Regions (dfs)
var solve = function (board) {
  const l = board.length;
  const rowLength = board.length;
  const colLength = board[0].length;
  const vis = [];
  const delrow = [-1, 0, +1, 0];
  const delcol = [0, +1, 0, -1];

  for (let row = 0; row < l; row++) {
    vis[row] = [];
    for (let col = 0; col < board[row].length; col++) {
      vis[row][col] = false;
    }
  }

  for (let i = 0; i < Math.max(rowLength, colLength); i++) {
    //top
    if (board[0] && board[0][i] === "O" && vis[0][i] === false) {
      dfs(0, i, vis);
    }
    //right
    if (
      board[i] &&
      board[i][colLength - 1] === "O" &&
      vis[i][colLength - 1] === false
    ) {
      dfs(i, colLength - 1, vis);
    }
    //down
    if (
      board[rowLength - 1] &&
      board[rowLength - 1][i] === "O" &&
      vis[rowLength - 1][i] === false
    ) {
      dfs(rowLength - 1, i, vis);
    }
    if (board[i] && board[i][0] === "O" && vis[i][0] === false) {
      dfs(i, 0, vis);
    }
  }

  function dfs(row, col, vis) {
    vis[row][col] = true;

    for (let i = 0; i < 4; i++) {
      let nrow = row + delrow[i];
      let ncol = col + delcol[i];

      if (
        nrow >= 0 &&
        ncol >= 0 &&
        nrow < board.length &&
        ncol < board[nrow].length &&
        board[nrow][ncol] === "O" &&
        vis[nrow][ncol] === false
      ) {
        dfs(nrow, ncol, vis);
      }
    }
  }

  for (let row2 = 0; row2 < l; row2++) {
    for (let col2 = 0; col2 < board[row2].length; col2++) {
      if (!vis[row2][col2]) {
        board[row2][col2] = "X";
      }
    }
  }

  return board;
};

const grid3 = [
  ["X", "O", "X", "O", "X", "O"],
  ["O", "X", "O", "X", "O", "X"],
  ["X", "O", "X", "O", "X", "O"],
  ["O", "X", "O", "X", "O", "X"],
];

// console.log(solve(grid3));

// Number of Enclaves [flood fill implementation - multisource]
//was easy  did'nt do it

// Word ladder - 1
//here this can be done with recursion if you try drawing it
//you can solve this bfs algo
//so in bfs make sure you remove the visited word from the list instead of keeping an index if you are thinking of that

// [word, level]
var ladderLength = function (beginWord, endWord, wordList) {
  if (!wordList.includes(endWord)) return 0;

  const queue = [];
  const set = new Set(wordList);

  queue.push([beginWord, 1]);

  while (queue.length) {
    const [word, level] = queue.shift();

    if (word === endWord) {
      return level;
    }

    for (let i = 0; i < word.length; i++) {
      for (let j = 97; j <= 122; j++) {
        const char = String.fromCharCode(j);
        const newword = word.slice(0, i) + char + word.slice(i + 1);
        if (set.has(newword)) {
          set.delete(newword);
          queue.push([newword, level + 1]);
        }
      }
    }
  }

  return 0;
};

const wordList = ["hot", "dot", "dog", "lot", "log", "cog"];
const startWord = "hit";
const endWord = "cog";
// console.log(ladderLength(startWord, endWord, wordList));

// Word ladder - 2
//this is my solution
var findLadders = function (beginWord, endWord, wordList) {
  const queue = [];
  const ans = [];
  const set = new Set(wordList);

  queue.push([beginWord]);

  while (queue.length) {
    const list = queue.shift();
    const word = list[list.length - 1];

    if (word === endWord) {
      ans.push([...list]);
    }

    set.delete(word);

    for (let i = 0; i < word.length; i++) {
      for (let j = 97; j <= 122; j++) {
        const char = String.fromCharCode(j);
        const newword = word.slice(0, i) + char + word.slice(i + 1);
        if (set.has(newword)) {
          queue.push([...list, newword]);
        }
      }
    }
  }

  return ans;
};

// const wordList2 = ["pat", "bot", "pot", "poz", "coz"];
const wordList2 = ["hot", "dot", "dog", "lot", "log", "cog"];
const firstWord = "hit";
const endWord2 = "cog";

// console.log(findLadders(firstWord, endWord2, wordList2));

// Number of Distinct Islands [dfs multisource]
//was easy did'nt do

// Bipartite Graph (DFS)
//this could easily done by dfs instead of visited track that by a color keeping array and also track if color are proper
//this not submitted full on leetcode

var isBipartite = function (graph) {
  const colorList = [];
  for (let _ of graph) {
    colorList.push(-1);
  }

  function dfs(node, colorList, color) {
    const adjColor = color ? 0 : 1;

    for (let adj of graph[node]) {
      if (colorList[adj] !== color && colorList[adj] === -1) {
        colorList[adj] = adjColor;
        if (!dfs(adj, colorList, adjColor)) return false;
      } else if (colorList[adj] === color) {
        return false;
      }
    }

    return true;
  }

  for (let i = 0; i < graph.length; i++) {
    if (color[i] === -1) {
      colorList[0] = 1;
      if (dfs(i, colorList, 1) === false) {
        return false;
      }
    }
  }

  return true;
};

const graph3 = [
  [],
  [2, 4, 6],
  [1, 4, 8, 9],
  [7, 8],
  [1, 2, 8, 9],
  [6, 9],
  [1, 5, 7, 8, 9],
  [3, 6, 9],
  [2, 3, 4, 6, 9],
  [2, 4, 5, 6, 7, 8],
];
console.log(isBipartite(graph3));

// Cycle Detection in Directed Graph (DFS)
//here we need to do backtracking
//keep two array vis and pathvis

function cycleInDirectedGraphDFS(graph) {
  const vis = [];
  const pathVis = [];
  for (let _ of graph) {
    vis.push(false);
    pathVis.push(false);
  }

  for (let i = 0; i < graph.length; i++) {
    if (vis[i] === 0) {
      if (dfs(i)) {
        return true;
      }
    }
  }

  function dfs(node) {
    vis[node] = true;
    pathVis[node] = true;

    for (let adj of graph[node]) {
      if (vis[adj] === false) {
        if (dfs(adj)) {
          return true;
        } else if (pathVis[adj]) {
          return true;
        }
      }
    }

    pathVis[node] = false;
    return false;
  }

  dfs();
}

// Find eventual safe states dfs
//here if you find a cycle means not safe

function eventualSafeState(graph) {
  const vis = [];
  const pathVis = [];
  const ans = [];

  for (let _ of graph) {
    vis.push(false);
    pathVis.push(false);
  }

  for (let i = 0; i < graph.length; i++) {
    if (vis[i] === false) {
      dfs(i);
    }
  }

  function dfs(node) {
    vis[node] = true;
    pathVis[node] = true;

    for (let adj of graph[node]) {
      if (vis[adj] === false) {
        if (dfs(adj)) {
          ans.push(node);
          return true;
        }
      } else if (pathVis[adj]) {
        ans.push(node);
        return true;
      }
    }

    pathVis[node] = false;
    return false;
  }

  return ans;
}

const graph4 = [[1, 2], [2, 3], [5], [0], [5], [], []];

console.log(eventualSafeState(graph4));
