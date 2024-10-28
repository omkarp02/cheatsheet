package main

import "fmt"

// func main() {
// 	prices := []string{}

// 	//you can't do this because that index does not exist
// 	// prices[1] = "sldkfj"

// 	//append does not modify the original array put gies a copy of neww udpated array
// 	prices = append(prices, "lskdfj")

// 	fmt.Println(cap(prices))
// }

// func main() {

// 	var productNames [4]string
// 	prices := [4]float64{10.99, 9.99, 45.99, 20.0}
// 	fmt.Println(prices)
// 	fmt.Println(productNames)

// 	fmt.Println(prices[2])

// 	productNames[3] = "A carpet"

// 	fmt.Println(productNames)

// 	//in go slice is pass by reference in javascirpt

// 	var a [4]string = [4]string{"1", "2", "3", "4"}

// 	b := a[1:]

// 	b[0] = "11"

// 	c := a[:1]

// 	//here the value of a changes making it pass by reference
// 	fmt.Println(a)
// 	fmt.Println(b)
// 	fmt.Println("data of a ->", len(a), cap(a))
// 	fmt.Println("data of b ->", len(b), cap(b))
// 	fmt.Println("data of c ->", len(c), cap(c)) //here
// }

type product struct {
	title string
	id    string
	price int
}

func main() {
	hobbies := []string{"anime", "some", "time"}

	fmt.Println(hobbies)
	fmt.Println(hobbies[0])
	fmt.Println(hobbies[1:3])

	mainHobbies := hobbies[:2]
	fmt.Println(mainHobbies)

	fmt.Println(cap(mainHobbies))
	mainHobbies = mainHobbies[1:3] //here if we try to acccess like this mainHobbies[1:] it will not work if you need to use [1:3]
	fmt.Println(mainHobbies)

	product1 := product{
		title: "Omkar",
		id:    "1a",
		price: 2234923402,
	}

	products := []product{product1}

	fmt.Println(products)

	a := []string{"1", "2", "3"}
	b := []string{"4", "5"}

	a = append(a, b...)

	fmt.Println(a)

	//make function

	//here 2 is length so go initilal create two empty space but the second value 5 is capacity which will create a space of capacity 5
	userNames := make([]string, 2, 5)

	userNames[0] = "Omkar"
	userNames[1] = "Pawar"

	userNames = append(userNames, "max")

	for index, value := range userNames {
		fmt.Println(index, value)
	}

}
