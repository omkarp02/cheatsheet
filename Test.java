import java.util.List;
import java.util.Arrays;

class Main {
    public static void main(String[] args) {

        // price = [2,5], special = [[3,0,5],[1,2,10]], needs = [3,2]
        Solution solution = new Solution();
        int[] nums1 = { 2, 1, -2, 5 };
        int[] nums2 = { 3, 0, -6 };
        int result = solution.maxDotProduct(nums1, nums2);
        System.out.println("Max Dot Product: " + result);

    }
}

class Solution {
    public int maxDotProduct(int[] nums1, int[] nums2) {

        boolean allPositiveNums1 = true;
        boolean allNegativeNums1 = true;
        boolean allPositiveNums2 = true;
        boolean allNegativeNums2 = true;
        for (int i = 0; i < Math.max(nums1.length, nums2.length); i++) {
            if (i < nums1.length && nums1[i] < 0) {
                allPositiveNums1 = false;
            }
            if (i < nums1.length && nums1[i] >= 0) {
                allNegativeNums1 = false;
            }
            if (i < nums2.length && nums2[i] < 0) {
                allPositiveNums2 = false;
            }
            if (i < nums2.length && nums2[i] >= 0) {
                allNegativeNums2 = false;
            }

        }

        if ((allPositiveNums1 && allNegativeNums2) || (allPositiveNums2 && allNegativeNums1)) {
            Arrays.sort(nums1);
            Arrays.sort(nums2);
            if (allPositiveNums1) {
                return nums1[0] * nums2[nums2.length - 1];
            }

            return nums2[0] * nums1[nums1.length - 1];
        }

        return dpSoln(nums1, nums2);
    }

    // nums1 = [2,1,-2,5], nums2 = [3,0,-6]
    public int helper(int i, int j, int[] nums1, int[] nums2) {
        if (i == nums1.length || j == nums2.length) {
            return 0;
        }

        int max;

        max = helper(i + 1, j + 1, nums1, nums2) + nums1[i] * nums2[j];

        int b = helper(i + 1, j, nums1, nums2);
        int c = helper(i, j + 1, nums1, nums2);

        return Math.max(max, Math.max(b, c));

    }

    public int dpSoln(int[] nums1, int[] nums2) {
        int n = nums1.length;
        int m = nums2.length;
        int[][] dp = new int[n + 1][m + 1];

        for (int i = nums1.length - 1; i >= 0; i--) {
            for (int j = nums2.length - 1; j >= 0; j--) {
                int max = dp[i + 1][j + 1] + nums1[i] * nums2[j];

                int b = dp[i + 1][j];
                int c = dp[i][j + 1];

                dp[i][j] = Math.max(max, Math.max(b, c));
            }
        }
        System.out.println(Arrays.deepToString(dp));
        return dp[0][0];
    }
}
