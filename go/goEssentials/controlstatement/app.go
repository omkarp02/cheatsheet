package main

import (
	"errors"
	"fmt"
	"os"
	"strconv"
)

func main() {
	fmt.Println("slkdfjsldf")

	var choice = "a"

	checkForA := choice == "a"

	if checkForA {
		fmt.Println(choice)
	} else if choice == "b" {
		fmt.Println(choice)
	} else {

		if choice == "c" {
			fmt.Println(choice)

		}

		fmt.Println(choice)
	}

	for i := 0; i < 2; i++ {
		fmt.Println(i)
	}

	i := 1

	for {
		fmt.Println("inside<<<<<<", i)
		if i == 3 {
			break
			//continue skip to next loop
			// return
		}

		i++
	}

	switch choice {
	case "a":
		fmt.Println(choice)
	case "b":
	case "c":
	default:
		fmt.Println("default")
	}

	asdf := 23
	fdas := 32

	a := &asdf
	a = &fdas

	fmt.Println(a, asdf, "<<<<<<<<<")

	writeBalanceToFile(3945)
	getBalaanceFromFiel()

	fmt.Println("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")

	alksdf := "234e"

	convertedInt, err := strconv.ParseInt(alksdf, 16, 64)

	if err != nil {
		fmt.Println("Error:", err)
	}

	fmt.Println(convertedInt)

}

func writeBalanceToFile(balanace int64) {

	balanceText := fmt.Sprint(balanace)
	asdf := string(balanace)

	fmt.Println("inside werite bal", asdf, balanceText)

	os.WriteFile("balance.txt", []byte(balanceText), 0644)
}

func getBalaanceFromFiel() (int, error) {
	fmt.Println("inside get balance fn")
	data, _ := os.ReadFile("balance.txt")
	balanceText := string(data)
	balance, err := strconv.ParseFloat(balanceText, 64)

	if err != nil {
		return 1000, errors.New("Fialed to parse")
	}

	fmt.Println(balance)

	return 1000, nil

}
