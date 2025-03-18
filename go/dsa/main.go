package main

import "fmt"

func main() {
	nums := []int{2, 4, 6, 8, 8, 8, 11, 13}
	getLowerbound(nums, 8)
}

func getLowerbound(nums []int, target int) {
	low := 0
	high := len(nums) - 1
	ans := -1
	for low <= high {
		mid := (low + high) / 2
		if nums[mid] >= target {
			ans = mid
			high = mid - 1
		} else {
			low = mid + 1
		}
	}
	fmt.Println(ans)
}
