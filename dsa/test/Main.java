package dsa.test;

import java.util.ArrayList;
import java.util.List;

class Main {
    public static void main(String[] args) {
        System.out.println("Hello, DSA!");

        Solution solution = new Solution();
        int[][] land = {
                { 1, 0 },
                { 1, 0, }
        };
        int[][] result = solution.findFarmland(land);
        for (int[] farm : result) {
            System.out.println("[" + farm[0] + ", " + farm[1] + ", " + farm[2] + ", " + farm[3] + "]");
        }
    }
}

class Solution {
    public int[][] findFarmland(int[][] land) {

        int[] start = null;
        boolean isLastRow = false;
        List<Integer[]> list = new ArrayList<>();

        for (int row = 0; row < land.length; row++) {
            for (int col = 0; col < land[0].length; col++) {
                if (land[row][col] == 1 && start == null) {
                    start = new int[] { row, col };
                }

                if (start != null) {
                    if (row == land.length - 1 || land[row + 1][col] == 0) {
                        isLastRow = true;
                    }
                }

                if ((land[0].length - 1 == col || land[row][col + 1] == 0) && isLastRow) {
                    list.add(new Integer[] { start[0], start[1], row, col });
                    isLastRow = false;
                    start = null;
                }

            }
        }

        int[][] result = new int[list.size()][];

        for (int i = 0; i < list.size(); i++) {
            Integer[] row = list.get(i);
            result[i] = new int[row.length];
            for (int j = 0; j < row.length; j++) {
                result[i][j] = row[j];
            }
        }

        return result;
    }
}