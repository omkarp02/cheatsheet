package main

import (
	"fmt"
)

func main() {
	nums := []int{8, 3, 4, 12, 5, 6, 2}
	mergeSort(0, len(nums)-1, nums)
}

func mergeSort(start int, end int, nums []int) {
	if start == end {
		return
	}

	mid := (start + end) / 2
	fmt.Println(mid)
}

func mergeSortHlp() {

}
