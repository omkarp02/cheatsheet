package main

import "fmt"

type User struct {
	email    string
	username string
	age      int
}

func (u User) Email() string {
	return u.email
}

func pointer() {
	user := User{
		email: "agg@goo.com",
	}

	fmt.Println(user.Email())
}
