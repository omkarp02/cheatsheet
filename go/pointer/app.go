package main

import "fmt"

func main() {
	age := 32

	agePointer := &age //now reference of age is stored here

	// adultYears := getAudltYears(age)

	fmt.Println(*agePointer) //this get the value behind the pointer
}

func getAudltYears(age *int) int {

	//here can modified the age value that has been passed
	// *age = *age - 18

	return *age - 18
}
