package main

import "fmt"

type User struct {
	name string
	age  string
	Address
}

type Address struct {
	street string
}

func main() {
	user := User{
		name: "omkar",
		age:  "32",
	}

	user.street = "hello"

	fmt.Println(user)
}
