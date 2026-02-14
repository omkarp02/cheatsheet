import java.util.List;
import java.util.Arrays;

class Main {
    public static void main(String[] args) {

        // price = [2,5], special = [[3,0,5],[1,2,10]], needs = [3,2]
        Solution solution = new Solution();
        int[] nums1 = { 2, 1, -2, 5 };
        int[] nums2 = { 3, 0, -6 };
        int result = solution.checkRecord(10101);
        System.out.println("Max Dot Product: " + result);

    }
}

class Solution {
    private static final int MOD = 1_000_000_007;

    public int checkRecord(int n) {
        // return helper(0, 0, 0, n);

        long[][][] dp = new long[2][3][n + 1];

        for (int a = 0; a < 2; a++) {
            for (int l = 0; l < 3; l++) {
                dp[a][l][n] = 1;
            }
        }
        for (int deep = n - 1; deep >= 0; deep--) {
            for (int absent = 0; absent < 2; absent++) {
                for (int noOfLeave = 0; noOfLeave < 3; noOfLeave++) {
                    long count = 0;
                    for (int i = 1; i <= 3; i++) {
                        if ((absent == 0 || i != 1) && (i == 3 ? noOfLeave < 2 : noOfLeave < 3)) {
                            count += (dp[i == 1 ? 1 : absent][i == 3 ? noOfLeave + 1 : 0][deep + 1]) % MOD;
                        }
                    }
                    dp[absent][noOfLeave][deep] = count;
                }
            }
        }


        return (int) dp[0][0][0];

    }

}