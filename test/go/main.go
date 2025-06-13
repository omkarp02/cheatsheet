package main

import (
	"fmt"
)

func main() {

	nums := []int{3, 0, 1}

	fmt.Println(missingNumber(nums))

}

func missingNumber(nums []int) int {

	var xor1 int
	for i := 0; i <= len(nums); i++ {
		fmt.Println(i)
		xor1 ^= i
	}

	var xor2 int
	for _, ele := range nums {
		fmt.Println(ele)
		xor2 ^= ele
	}

	return xor1 ^ xor2
}

func swap(arr []int, i int, j int) {
	temp := arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}
