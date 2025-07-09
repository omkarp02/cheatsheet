var findItinerary = function (tickets) {
  const adj = {};
  for (let item of tickets) {
    if (adj[item[0]]) {
      adj[item[0]].push(item[1]);
    } else {
      adj[item[0]] = [item[1]];
    }
  }

  for (let key in adj) {
    adj[key].sort((a, b) => a.localeCompare(b));
  }

  const result = [];

  function dfs(curNode) {
    result.push(curNode);
    if (result.length === tickets.length + 1) {
      return true;
    }

    if (adj[curNode] && adj[curNode].length) {
      const nextNode = adj[curNode].shift();
      if (dfs(nextNode)) {
        return true;
      } else {
        if (adj[curNode].length) {
          adj[curNode].push(result.pop());
          const nextNode = adj[curNode].shift();
          return dfs(nextNode);
        }
      }
    } else {
      return false;
    }

    return true;
  }

  dfs("JFK");
  return result;
};

const tickets = [
  ["JFK", "BFK"],
  ["JFK", "CFK"],
  ["CFK", "JFK"],
];
console.log(findItinerary(tickets));
