package main

import (
	"fmt"
	"time"
)

func slowGreet(doneChan chan bool) {
	time.Sleep(4 * time.Second)
	fmt.Println("Hello!")
	doneChan <- true
	close(doneChan)
}

func greet(doneChan chan bool) {
	fmt.Println("Greet")
	doneChan <- true
}

// func main() {
// myChannel := make(chan bool, 4)

// //here we are using close keyword in the slowgreet so we need to know which guy is going to be slow
// go greet(myChannel)
// go slowGreet(myChannel)
// go greet(myChannel)
// go greet(myChannel)

// for doneChan := range myChannel {
// 	fmt.Println("ola")
// 	fmt.Println(doneChan)
// }

// //here another way

// pendingChan := make(chan string, 4)

// arr := []int{1, 1, 0, 1}

// for doneChan := range

// }

// func main() {

// 	charChannel := make(chan string, 3)
// 	chars := []string{"a", "b", "c"}

// 	for _, s := range chars {
// 		select {
// 		case charChannel <- s:
// 		}
// 	}

// 	close(charChannel)

// 	for result := range charChannel {
// 		fmt.Println(result)
// 	}

// }

// func fibonacci(c, quit chan int) {
// 	x, y := 0, 1
// 	for {
// 		select {
// 		case c <- x:
// 			x, y = y, x+y
// 		case <-quit:
// 			fmt.Println("quit")
// 			return

// 		}
// 	}
// }

// func main() {
// 	c := make(chan int)
// 	quit := make(chan int)
// 	go func() {
// 		for i := 0; i < 10; i++ {
// 			fmt.Println(<-c)
// 		}
// 		quit <- 0
// 	}()
// 	fibonacci(c, quit)
// }

func sliceToChannel(nums []int) <-chan int {
	out := make(chan int)

	go func() {
		for _, n := range nums {
			out <- n
		}

		close(out)
	}()

	return out
}

func sq(in <-chan int) chan int {
	out := make(chan int)

	go func() {
		for n := range in {
			out <- n * n
		}

		close(out)
	}()

	return out

}

func main() {
	nums := []int{1, 2, 3, 4, 5, 6}

	dataChannel := sliceToChannel(nums)

	finalChannel := sq(dataChannel)

	for n := range finalChannel {
		fmt.Println(n)
	}

}
