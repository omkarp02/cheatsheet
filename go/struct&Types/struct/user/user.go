package user

import (
	"errors"
	"fmt"
	"time"
)

type User struct {
	firstName  string
	lastName   string
	middleName string
	age        int
	createdAt  time.Time
}

type Admin struct {
	email    string
	password string
	User     //we can use User like this directly
	// user User
}

func (u User) OutputTheStruct() {
	fmt.Println(u.firstName, u.middleName, u.lastName, u.age)
}

// here to udpate we need to pass reference
func (u *User) ClearUserName() {
	u.firstName = ""
	u.lastName = ""
	u.middleName = ""
}

// here there is pattern to name constructor new
func New(firstName string, lastName string, middleName string, age int) (*User, error) {

	if firstName == "" || lastName == "" || middleName == "" {
		return nil, errors.New("mandatory fields are required")
	}

	return &User{
		firstName:  firstName,
		middleName: middleName,
		lastName:   lastName,
		age:        age,
		createdAt:  time.Now(),
	}, nil
}

func NewAdmin(email, password string) *Admin {

	return &Admin{
		email:    email,
		password: password,
		User: User{
			firstName:  "admin",
			lastName:   "asdf",
			middleName: "laksjdf",
			age:        23,
		},
	}
}
