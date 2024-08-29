// Topo Sort

//topo sort can only happen in direct acylic graph

//this you were able to do yourself
function topoSort(graph) {
  const vis = [];
  const ans = [];

  for (let _ of graph) {
    vis.push(false);
  }

  for (let i = 0; i < graph.length; i++) {
    if (vis[i] === false) {
      dfs(i);
    }
  }

  function dfs(node) {
    vis[node] = true;

    for (let adj of graph[node]) {
      if (vis[adj] === false) {
        dfs(adj);
      }
    }

    ans.push(node);
  }

  return ans.reverse();
}

const graph = [[2, 3], [4], [1, 3], [1], [], [1, 4]];
// console.log(topoSort(graph));

//kahn algo topo sort by indegree this see the intuition one time around 3 min to understand
///so basically find the node with indegree 0 and put them in queue then pop it and decrease the others indegree

// Kahn's Algorithm
function kahnAlgo(graph) {
  //finding the indegree

  const indegree = [];
  let queue = [];
  let ans = [];

  for (let _ of graph) {
    indegree.push(0);
  }

  for (let item of graph) {
    for (let adj of item) {
      indegree[adj] += 1;
    }
  }

  for (let i = 0; i < indegree.length; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  while (queue.length) {
    const node = queue.shift();
    ans.push(node);

    for (let adj of graph[node]) {
      indegree[adj] -= 1;
      if (indegree[adj] === 0) {
        queue.push(adj);
      }
    }
  }

  return ans;
}

const graph2 = [[], [], [3], [1], [0, 1], [0, 2]];
// console.log(kahnAlgo(graph2));

// Cycle Detection in Directed Graph (BFS)
//this can be done by kahn algo here topo sort does not work in cyclic graph so if it does not work means it is cyclic

// Course Schedule - I
//this can be done by toposort

// Course Schedule - II
//this can be done by toposort

// Find eventual safe states bfs
//this can be done using kahn algo

// Alien dictionary
//just try creating graph from dict rest is easy
//here you can compare the first and second word and so on and form the graph

function findOrder(dict, wordL) {
  const graph = [];

  for (let k = 0; k < wordL; k++) {
    graph.push([]);
  }

  for (let i = 0; i < dict.length - 1; i++) {
    let s1 = dict[i];
    let s2 = dict[i + 1];
    let maxLen = Math.min(s1.length, s2.length);

    for (let j = 0; j < maxLen; j++) {
      const l1 = s1[j].charCodeAt(0) - 97;
      const l2 = s2[j].charCodeAt(0) - 97;

      if (l1 !== l2) {
        graph[l1].push(l2);
        break;
      }
    }
  }

  return graph;
}

const dict = ["baa", "abcd", "abca", "cab", "cad"];
console.log(findOrder(dict, 4));
