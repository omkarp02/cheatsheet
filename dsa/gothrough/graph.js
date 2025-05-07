/*

easy
make vis true in for loop while iterating adj
BFS

easy
here do vis true at start
DFS

easy use bfs or dfs
Number of provinces (leetcode)

so there are two rotten orange push both in queue and start bfs
Rotten Oranges

bfs
Flood fill

bfs make sure you use parent
Cycle Detection in unirected Graph (bfs)

dfs make sure to use parent
Cycle Detection in undirected Graph (dfs)

put all 1 in queue and do bfs
0/1 Matrix (Bfs Problem)

dfs
Surrounded Regions (dfs)

put all boundary element in array first 
Number of Enclaves [flood fill implementation - multisource]

bfs algo
put in queue word, level and remove from wordlist once visited
Word ladder - 1

use set
push this in queue [bat] [bat, pot , tot]
Word ladder - 2

easy
Number of Distinct Islands [dfs multisource]

dfs
Bipartite Graph (DFS)

use backtracking
Cycle Detection in Directed Graph (DFS)

dfs + hash map 
Clone Graph

topo sort only work on dag directed acyclic graph

do dfs once you reach end put in stack
Topo Sort (dfs)

start dfs from the atlanic and pacific ocean means from the border
Pacific Atlantic Water Flow

this only for directed asyclic graph
so basically find the node with indegree 0 and put them in queue and start decreasing the neighboring and pop whose indegree is 0
Kahn's Algorithm (topo sort bfs) 

easy use topo sort
Cycle Detection in Directed Graph (BFS)

using topo bfs sort
Course Schedule - I

using topo bfs sort
Course Schedule - II

can be done using dfs vis and pathvis algo
bfs: reverse all the edges and do topolocical sort
Find eventual safe states

just compare letter of first char of first word and first char of second word and form a graph
and do topo sort of bfs
Alien dictionary

plain bfs algo and dist array
Shortest Path in UG with unit weights

do topo sort => take node out from stack and start marking the distance of there adj node 
Shortest Path in DAG

use min heap + dist arr in queue put this [dist, node] ( this fail in negative edges and negative cycle)
Djisktra's Algorithm

Why priority Queue is used in Djisktra's Algorithm

use djisktra
Shortest path in a binary maze

take min heap and in dist array keep the min diff
Path with minimum effort

no need for priority queue just keep the algo around stops
Cheapest flights within k stops

Network Delay time

need to maintain two array one for dist and another for ways and a minheap
Number of ways to arrive at destination

Minimum steps to reach end from start by performing multiplication and mod operations with array elements

Step 1 : relax all edges
Bellman Ford Algorithm

Floyd Warshal Algorithm

Find the city with the smallest number of neighbors in a threshold distance

Minimum spanning tree
a tree in which we have n nodes and n-1 edges and all nodes are reachable from each other
tree with least sum is called minimum spanning tree


keep minheap with wt, node, parent
when you pop then maark it as visited
Prim's Algorithm

Disjoint set

Krushal algo
	
Number of operations to make network connected

*/