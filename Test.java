// import static org.junit.jupiter.api.Assertions.assertEquals;

// import org.junit.jupiter.api.Test;
import java.util.*;

class Test {
    public static void main(String[] args) {
        System.out.println("Try programiz.pro");
        Solution solution = new Solution();

        //nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]

        int[] s = {1,2,3,2,1};
        int[] s2 = {3,2,1,4,7};
        int result = solution.findLength(s, s2);
        System.out.println(result);

    }
}

//asdf

// nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
class Solution {
    public int findLength(int[] nums1, int[] nums2) {
        return helperRec(nums1.length, nums2.length, nums1, nums2);
    }

    public int helperRec(int i , int j, int[] nums1, int[] nums2) {
        if(i == 0 || j == 0){
            return 0;
        }
        if(nums1[i - 1] == nums2[j - 1]){
            return 1 + helperRec(i - 1, j - 1, nums1, nums2);
        }else{
            int a = helperRec(i - 1, j, nums1, nums2);
            int b = helperRec(i, j - 1, nums1, nums2);
            return Math.max(a, b);
        }
    }
}

// asdf