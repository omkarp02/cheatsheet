// import static org.junit.jupiter.api.Assertions.assertEquals;

// import org.junit.jupiter.api.Test;
import java.util.*;

class Test {
    public static void main(String[] args) {
        System.out.println("Try programiz.pro");
        Solution solution = new Solution();

        // nums1 = [1,2,3,2,1], nums2 = [2,1,3,2,1,4,7]

        String word1 = "sea";
        String word2 = "eat";
        int result = solution.minDistance(word1, word2);
        System.out.println(result);

    }
}

// asdf

// word1 = "sea", word2 = "eat"
class Solution {
    public int minDistance(String word1, String word2) {
        return dp( word1, word2);
    }


    public int dp(String w1, String w2){
        int n = w1.length();
        int m = w2.length();

        int[][] dp = new int[n + 1][m + 1];


        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i == 0) {
                    dp[i][j] = j;
                } else if (j == 0) {
                    dp[i][j] = i;
                } else if (w1.charAt(i - 1) == w2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + 1;
                }
            }
        }

        return dp[n][m];
    }
}

// asdf