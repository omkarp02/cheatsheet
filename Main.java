import java.util.List;
import java.util.Map;
import java.util.Arrays;
import java.util.HashMap;

class Main {
    public static void main(String[] args) {

        // price = [2,5], special = [[3,0,5],[1,2,10]], needs = [3,2]
        Solution solution = new Solution();
        int[] nums1 = { 1,2,1,2,3 };
        int result = solution.subarraysWithKDistinct(nums1, 2);
        System.out.println("Max Dot Product: " + result);

    }
}

class Solution {

    // nums = [1,2,1,2,3], k = 2
    public int subarraysWithKDistinct(int[] nums, int k) {
        int a = helper(nums, k);
        int b = helper(nums, k - 1);
        return a - b;
    }

    // nums = [1,2,1,2,3], k = 2
    public int helper(int[] nums, int k){
        if(k == 0) return 0;
 
        int l = 0;
        int r = 0;
        Map<Integer, Integer> map = new HashMap<>();
        int count = 0;
        while(r < nums.length){
            map.put(nums[r], map.getOrDefault(nums[r], 0) + 1);
            while(map.size() > k){
                map.put(nums[l], map.get(nums[l]) - 1);
                if(map.get(nums[l]) == 0) {
                    map.remove(nums[l]);
                };
                l += 1;
            }

            count += r - l + 1;
            r += 1;
        }
        
        return count; 
    }
}
