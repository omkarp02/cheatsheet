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
    public int checkRecord(int n) {
        
    }

    //a: 1, p: 2, l:3
    public helper(int absent, int noOfLeave, int deep, int n){


        for(int i = 1; i <= 3; i++) {
            if(absent == 0 || i != 1){
                helper(i == 1 ? 1 : 0 , i == 3 ? noOfLeave + 1 : 0, deep + 1, n);
            }
        }


    }
}