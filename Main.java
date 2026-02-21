import java.util.List;
import java.util.Map;
import java.util.Arrays;
import java.util.HashMap;

class Main {
    public static void main(String[] args) {

        // price = [2,5], special = [[3,0,5],[1,2,10]], needs = [3,2]
        Solution solution = new Solution();
        int[] nums1 = { 1, 2, 1, 2, 3 };
        String str1 = "horse";
        String str2 = "ros";
        int result = solution.minDistance(str1, str2);
        System.out.println("===========> " + result);

    }
}

// word1 = "horse", word2 = "ros"
class Solution {
    public int minDistance(String word1, String word2) {
        int n = word1.length();
        int m = word2.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 0; i <= n; i++) {
            dp[i][0] = i;
        }
        for (int j = 0; j <= m; j++) {
            dp[0][j] = j;
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.min(dp[i][j - 1],
                            Math.min(dp[i - 1][j], dp[i - 1][j - 1])) + 1;
                }

            }
        }

        return dp[n][m];

    }


}
