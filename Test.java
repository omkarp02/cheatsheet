import java.util.*;

class Test {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        Solution sol = new Solution();
        // colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]
        String colors = "abaca";
        int[][] edges = { { 0, 1 }, { 0, 2 }, { 2, 3 }, { 3, 4 } };
        int result = sol.largestPathValue(colors, edges);
        System.out.println(result);
    }
}


     // colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]
class Solution {
    public int largestPathValue(String colors, int[][] edges) {
        // Implementation goes here
        // int[][] adjList = new int[][];
        for (int[] edge: edges){
            
        }


        return 0;
    }

    public void dfs(){

    }
}