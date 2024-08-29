// Shortest Path in UG with unit weights
//this was easy can be done using a dist array only

// [node, dist]
function shortestPath(graph, src) {
  const queue = [];
  const dist = [];

  for (let _ of graph) {
    dist.push(Infinity);
  }

  dist[src] = 0;
  queue.push(src);
  while (queue.length) {
    const node = queue.shift();

    for (let adj of graph[node]) {
      if (dist[node] + 1 < dist[adj]) {
        dist[adj] = dist[node] + 1;
        queue.push(adj);
      }
    }
  }

  return dist;
}

const graph = [
  [1, 3],
  [0, 2, 3],
  [1, 6],
  [0, 4],
  [3, 5],
  [4, 6],
  [2, 5, 7, 8],
  [6, 8],
  [6, 7],
];

// console.log(shortestPath(graph, 0));

// Shortest Path in DAG
//this can be done using topo sort
//first reach the end using dfs topo sort and will return stack marking the dist
//this intuition behind topo sort is you are moving from start and end
//once with explaintion you were able to solve yourself

// [node, dist]
function shortestPathInDAG(graph) {
  const vis = [];
  const topoSort = [];
  const distList = [];

  for (let _ of graph) {
    vis.push(false);
    distList.push(Infinity);
  }

  for (let i = 0; i < graph.length; i++) {
    if (vis[i] === false) {
      dfs(i);
    }
  }

  function dfs(node) {
    vis[node] = true;
    for (let [adj, dist] of graph[node]) {
      if (vis[adj] === false) {
        dfs(adj);
      }
    }

    topoSort.push(node);
  }

  const first = topoSort[topoSort.length - 1];
  distList[first] = 0;

  while (topoSort.length) {
    const node = topoSort.pop();
    const curdist = distList[node];

    for (let [adj, dist] of graph[node]) {
      const adjDist = dist + curdist;
      if (adjDist < distList[adj]) {
        distList[adj] = adjDist;
      }
    }
  }

  return distList;
}

const graph2 = [
  [[1, 2]],
  [[3, 1]],
  [[3, 3]],
  [],
  [
    [0, 3],
    [2, 1],
  ],
  [[4, 1]],
  [
    [4, 2],
    [5, 3],
  ],
];

// console.log(shortestPathInDAG(graph2));

// Djisktra's Algorithm in direct weighted graph
//so make a minheap and put the 0 node in min heap find the adjacent put in min head and update the distnace
//in djistra we could use priority queue or set so if you use set there is one advantage suppose you are in potstion where you have find the the distance to reach 2 which was 8 and now you have found 2 which is less so you can remove the node with dist 8 from the array so it will be not travse again

// Why priority Queue is used in Djisktra's Algorithm

// Shortest path in a binary maze
// [row, col, dist]
//this was easy but implementaion heavy
var shortestPathBinaryMatrix = function (grid) {
  const queue = [];
  const delrow = [-1, 0, +1, 0];
  const delcol = [0, +1, 0, -1];
  const distList = [];

  for (let i = 0; i < grid.length; i++) {
    distList[i] = [];
    for (let j = 0; j < grid[i].length; j++) {
      distList[i][j] = Infinity;
    }
  }

  queue.push([0, 0, 0]);
  distList[0][0] = 0;

  while (queue.length) {
    const [row, col, dist] = queue.shift();

    for (let i = 0; i < 4; i++) {
      let nrow = row + delrow[i];
      let ncol = col + delcol[i];
      if (
        nrow >= 0 &&
        ncol >= 0 &&
        nrow < grid.length &&
        ncol < grid[nrow].length &&
        grid[nrow][ncol] === 0 &&
        dist + 1 < distList[nrow][ncol]
      ) {
        distList[nrow][ncol] = dist + 1;

        if (nrow === grid.length - 1 && ncol === grid[0].length - 1) {
          return dist + 1;
        }

        queue.push([nrow, ncol, dist + 1]);
      }
    }
  }

  return -1;
};

const grid = [
  [0, 0, 0],
  [1, 1, 0],
  [1, 1, 0],
];
// console.log(shortestPathBinaryMatrix(grid));

// Path with minimum effort
//use priorit queue wiht the diff, and where ever you find small diff update in dist array

// Cheapest flights within k stops
//this can't be solved wiht priority queue with dist as the priority queue min, you need to store everyting in term of stops instead of priority queue use jsut take queue because you are using stop so queue will always be 1, 1, 2, 2, 3, 3, 3

// [dist, cost]
//queue [node, stop, dist]
var findCheapestPrice = function (n, flights, src, dst, k) {
  const queue = [];
  const distList = [];

  const graph = [];

  for (let i = 0; i < n; i++) {
    distList.push(Infinity);
    graph.push([]);
  }
  for (let [src, dist, cost] of flights) {
    graph[src].push([dist, cost]);
  }

  queue.push([src, 0, 0]);

  while (queue.length) {
    const [node, stop, cost] = queue.shift();

    for (let [adj, adjCost] of graph[node]) {
      if (cost + adjCost < distList[adj] && stop + 1 <= k) {
        distList[adj] = cost + adjCost;
        queue.push([adj, stop + 1, distList[adj]]);
      }
    }
  }

  return distList[dst];
};

const n = 4;
const flights = [
  [0, 1, 100],
  [1, 2, 100],
  [2, 0, 100],
  [1, 3, 600],
  [2, 3, 200],
];
const src = 0;
const dst = 3;
const k = 1;

// findCheapestPrice(n, flights, src, dst, k);

// Network Delay time

// Number of ways to arrive at destination
//need to maintain two array one for dist and another for ways

//[node, dist]
function numberOfWays(roads, n) {
  const queue = [];
  const graph = [];
  const distList = [];
  const ways = [];

  for (let i = 0; i < n; i++) {
    graph[i] = [];
    distList[i] = Infinity;
    ways[i] = 0;
  }

  for (let way of roads) {
    graph[way[0]].push([way[1], way[2]]);
    graph[way[1]].push([way[0], way[2]]);
  }

  queue.push([0, 0]);
  ways[0] = 1;

  while (queue.length) {
    const [curnode, curDist] = getTheSmallestFromQueue(1, queue);
    const parentWay = ways[curnode];

    for (let [adjNode, adjDist] of graph[curnode]) {
      const totaldist = curDist + adjDist;

      if(adjNode === 6){
        console.log(',,,')
      }

      if (totaldist < distList[adjNode]) {
        distList[adjNode] = totaldist;
        ways[adjNode] = parentWay;
        queue.push([adjNode, totaldist]);
      } else if (totaldist === distList[adjNode]) {
        ways[adjNode] += ways[curnode];
      }
    }
  }

  return ways;
}

function getTheSmallestFromQueue(index, queue) {
  let smallestindex = 0;

  for (let i = 1; i < queue.length; i++) {
    const item = queue[i];

    if (queue[smallestindex][index] > item[index]) {
      smallestindex = i;
    }
  }
  const val = queue[smallestindex];
  queue.splice(smallestindex, 1);
  return val;
}

const roads = [
  [0, 6, 7],
  [0, 1, 2],
  [1, 2, 3],
  [1, 3, 3],
  [6, 3, 3],
  [3, 5, 1],
  [6, 5, 1],
  [2, 5, 1],
  [0, 4, 5],
  [4, 6, 2],
];

const n2 = 7;

console.log(numberOfWays(roads, n2), "<");

const queue = [
  [4, 1],
  [2, 5],
  [3, 2],
  [1, 5],
];

//this was easy you were able to figure out yourself
// Minimum steps to reach end from start by performing multiplication and mod operations with array elements

// Bellman Ford Algorithm

// Floyd Warshal Algorithm

// Find the city with the smallest number of neighbors in a threshold distance
