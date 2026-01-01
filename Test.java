// import static org.junit.jupiter.api.Assertions.assertEquals;

// import org.junit.jupiter.api.Test;
import java.util.*;

class Test {
    public static void main(String[] args) {
        System.out.println("Try programiz.pro");
        Solution solution = new Solution();

        // nums1 = [1,2,3,2,1], nums2 = [2,1,3,2,1,4,7]

        int[] nums = { 24, 13, 1, 100, 0, 94, 3, 0, 3 };
        int result = solution.longestArithSeqLength(nums);
        System.out.println(result);

    }
}

// nums = [1, 7, 10, 13, 14, 19], 1, 7, 13, 19
class Solution {
    List<Integer> asdf = new ArrayList<>();

    public int longestArithSeqLength(int[] nums) {
        return helper(0, -1, null, nums);
    }

    public int helper(int i, int prev, Integer diff, int[] nums) {
        if (i == nums.length) {
            return 0;
        }

        int count = 0;
        if (prev == -1) {
            count = helper(i + 1, i, null, nums) + 1;
        } else {
            int d = nums[i] - nums[prev];
            if(diff == null || d == diff){
                count = helper(i + 1, i, diff == null ? d : diff, nums)  + 1;
            }
        }
        int b = helper(i + 1, prev, diff, nums);
        count = Math.max(b, count);

        return count;
    }


}



// asdf