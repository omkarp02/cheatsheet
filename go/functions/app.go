package main

import "fmt"

type transformfn func(int) int

func main() {

	numbers := []int{1, 2, 3, 4}
	doubled := transformNumbers(&numbers, double)
	tripled := transformNumbers(&numbers, triple)

	fmt.Println(doubled, tripled)

	transformed := transformNumbers(&numbers, func(number int) int {
		return number * 2
	})

	fmt.Println(transformed)
	fmt.Println("<<<<<<<<<<<<<<")

	factorial := nFactorial(5)
	fmt.Println(factorial)

	sumup(numbers...)
	sumup(1, 2, 3, 4)
}

func transformNumbers(numbers *[]int, transform transformfn) []int {
	dNumber := []int{}
	for _, val := range *numbers {
		dNumber = append(dNumber, transform(val))
	}

	return dNumber
}

func double(number int) int {
	return number * 2
}

func exReturnFn() transformfn {
	return double
}

func triple(number int) int {
	return number * 3
}

func createTransformer(factor int) func(int) int {
	return func(number int) int {
		return number * factor
	}
}

func nFactorial(n int) int {
	if n == 1 {
		return 1
	}
	return n * nFactorial(n-1)
}

func sumup(nums ...int) int {
	sum := 0
	for _, val := range nums {
		sum += val
	}
	return sum
}
