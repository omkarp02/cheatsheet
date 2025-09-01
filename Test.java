import java.util.Arrays;

class Test {
    public static void main(String[] args) {
        System.out.println("Hello worl");
        int[] nums1 = new int[] { 1, 3, 3, 2 };
        int[] nums2 = new int[] { 2, 1, 3, 4 };
        Solution s = new Solution();
        s.maxScore(nums1, nums2, 3);
    }
}

class Pair {
    int a;
    int b;

    Pair(int a, int b) {
        this.a = a;
        this.b = b;
    }

    @Override
    public String toString() {
        return "(" + a + ", " + b + ")";
    }

}

class Solution {
    public long maxScore(int[] nums1, int[] nums2, int k) {
        Pair[] pairList = new Pair[nums2.length];
        for (int i = 0; i < nums2.length; i++) {
            pairList[i] = new Pair(nums1[i], nums2[i]);
        }

        Arrays.sort(pairList, (a, b) -> b.b - b.a);

        System.out.println(Arrays.toString(pairList));
        return 234234;
    }
}

// nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3