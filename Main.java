import java.util.List;
import java.util.Arrays;

class Main {
    public static void main(String[] args) {

        // price = [2,5], special = [[3,0,5],[1,2,10]], needs = [3,2]
        Solution solution = new Solution();
        int[] nums1 = { 1, 2, 5 };
        int result = solution.change(5, nums1);
        System.out.println("Max Dot Product: " + result);

    }
}

class Solution {
    public int change(int amount, int[] coins) {
        int dp[][] = 
    }

    public int helper(int i, int target, int[] coins) {
        if (i == 0) {
            if (target == 0 || target == coins[i])
                return 1;
            if (target % coins[i] == 0) {
                return 1;
            }
            return 0;
        }

        int sum = 0;
        if (coins[i] <= target) {
            sum += helper(i, target - coins[i], coins);
        }

        sum += helper(i - 1, target, coins);

        return sum;
    }

