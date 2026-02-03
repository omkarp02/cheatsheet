import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[][] tiles = { { 1, 1 }, { 10, 11 } };
        int carpetLen = 2;
        int result = solution.maximumWhiteTiles(tiles, carpetLen);
        System.out.println(result);
    }
}

class Solution {
    public int maximumWhiteTiles(int[][] tiles, int carpetLen) {
        Arrays.sort(tiles, (a, b) -> a[0] - b[0]);
        int l = 0;
        int r = 0;

        int curSum = 0;
        int max = 0;
        int totalTilesCovered = 0;
        while (r < tiles.length) {
            int curr = tiles[r][1] - tiles[r][0] + 1;
            if (totalTilesCovered + curr >= carpetLen) {
                max = Math.max(max, curSum + (carpetLen - totalTilesCovered));
            }
            totalTilesCovered += curr;
            curSum += curr;

            if (r < tiles.length - 1) {
                totalTilesCovered += tiles[r + 1][0] - tiles[r][1] - 1;
            }

            while (totalTilesCovered > carpetLen) {
                totalTilesCovered -= tiles[l][1] - tiles[l][0] + 1;
                curSum -= tiles[l][1] - tiles[l][0] + 1;
                if (l < tiles.length - 1) {
                    totalTilesCovered -= tiles[l + 1][0] - tiles[l][1] - 1;
                }
                l++;
            }

            if (curSum >= carpetLen) {
                return curSum;
            }

            max = Math.max(curSum, max);
            r++;
        }

        return max;
    }
}
