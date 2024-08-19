//graph representation

// BFS

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
// [row, col, level]
var orangesRotting = function (grid) {
  const delrow = [-1, 0, +1, 0];
  const delcol = [0, +1, 0, -1];

  const queue = [];
  const vis = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 2) {
        queue.push([row, col, 0]);
      }
    }
  }

  console.log(queue);

  function bfs(row, col) {}

  bfs(row, col);

  return image;
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

console.log(detectUndirectedGraphInDFS(graph2));

// 0/1 Matrix (Bfs Problem)

// Surrounded Regions (dfs)

// Number of Enclaves [flood fill implementation - multisource]

// Word ladder - 1

// Word ladder - 2

// Number of Distinct Islands [dfs multisource]

// Bipartite Graph (DFS)

// Cycle Detection in Directed Graph (DFS)
