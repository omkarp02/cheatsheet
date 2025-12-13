// import static org.junit.jupiter.api.Assertions.assertEquals;

// import org.junit.jupiter.api.Test;
import java.util.*;

class Test {
    public static void main(String[] args) {
        System.out.println("Try programiz.pro");
        Solution solution = new Solution();

        // nums1 = [1,2,3,2,1], nums2 = [2,1,3,2,1,4,7]

        int[] s = { 0,0,0,0,1 };
        int[] s2 = { 1,0,0,0,0 };
        int result = solution.findLength(s, s2);
        System.out.println(result);

    }
}

// asdf

// nums1 = [1,2,3,2,1], nums2 = [2,1,3,2,1,4,7]
class Solution {
    int max = 0;
    public int findLength(int[] nums1, int[] nums2) {
         helperRec(nums1.length, nums2.length, nums1, nums2);
         return this.max;
    }

    public int helperRec(int i, int j, int[] nums1, int[] nums2) {
        if (i == 0 || j == 0) {
            return 0;
        }
        if (nums1[i - 1] == nums2[j - 1]) {
            int max = 1 + helperRec(i - 1, j - 1, nums1, nums2);
            this.max = Math.max(this.max, max);
            return max;
        } else {
            helperRec(i - 1, j, nums1, nums2);
            helperRec(i, j - 1, nums1, nums2);
            return 0;
        }
    }
}

// asdf