package main

import (
	"fmt"
	"log"
	"math/rand"
	"sync"
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

func main() {
	myChannel := make(chan bool, 4)

	//here we are using close keyword in the slowgreet so we need to know which guy is going to be slow
	go greet(myChannel)
	go slowGreet(myChannel)
	go greet(myChannel)
	go greet(myChannel)

	for doneChan := range myChannel {
		fmt.Println("ola")
		fmt.Println(doneChan)
	}
}

// //here another way

// pendingChan := make(chan string, 4)

// arr := []int{1, 1, 0, 1}

// for doneChan := range

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

// func main() {
// 	nums := []int{1, 2, 3, 4, 5, 6}

// 	dataChannel := sliceToChannel(nums)

// 	finalChannel := sq(dataChannel)

// 	for n := range finalChannel {
// 		fmt.Println(n)
// 	}

// }

//Mutex

var (
	lock   sync.Mutex
	rwLock sync.RWMutex
	count  int
)

func increment() {
	// lock.Lock()
	time.Sleep(500 * time.Millisecond)
	count++

	// lock.Unlock()
}

func basic() {
	interation := 1000
	for i := 0; i < interation; i++ {
		go increment()
	}

	time.Sleep(1 * time.Second)
	log.Println("hello", count)
}

func write() {
	rwLock.Lock()
	defer rwLock.Unlock()

	fmt.Println("Write locing")
	time.Sleep(1 * time.Second)
	fmt.Println("Write unlocking")

}

func read() {
	rwLock.RLock()
	defer rwLock.RUnlock()

	fmt.Println("Reading locing")
	time.Sleep(1 * time.Second)
	fmt.Println("Reading unlocking")

}

func readWrite() {
	go read()
	go read()
	go read()
	go read()
	go write()

	time.Sleep(8 * time.Second)
}

//we will see the once keyword

func completeonce() {
	var wg sync.WaitGroup
	wg.Add(100)

	var once sync.Once

	for i := 0; i < 100; i++ {
		if foundTreasure() {
			once.Do(missionIsCompleted)
		}
	}

}

func foundTreasure() bool {
	return rand.Intn(10) == 3
}

func missionIsCompleted() {
	log.Println("missino is completed")
}

func grreth(doneChan chan bool) {
	log.Println("ola darling")
	doneChan <- true
}

type KV struct {
	data string
}

// Constructor that returns a pointer
func NewKVPointer() *KV {
	return &KV{
		data: "ola",
	}
}

// Constructor that returns a value

func fetchUserLikes(userName string, respchan chan any) {
	time.Sleep(time.Millisecond * 150)
	respchan <- 11
}

func fetchUserDislikes(userName string, respchan chan any) {
	time.Sleep(time.Millisecond * 150)
	respchan <- 3
}

func main() {
	n := 2
	donechan := make(chan any, n)

	go fetchUserLikes("sdf", donechan)
	go fetchUserDislikes("sdf", donechan)

	// for resp := range donechan {
	// n -= 1
	// fmt.Println(resp)
	// if n == 0 {
	// 	close(donechan)
	// }
	// }
	// basic()
	// readWrite()
	// completeonce()

	// tempChan := make(chan bool)
	// go grreth(tempChan)
	// log.Println(<-tempChan)

// }
