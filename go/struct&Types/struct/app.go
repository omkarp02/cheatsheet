package main

import (
	"fmt"

	"example.com/ola/user"
)

func main() {

	appUser, err := user.New("omkar", "pawar", "ravindra", 23) //here there is pattern to name constructor new

	admin := user.NewAdmin("admin@gmal.com", "slkfjsldfk")

	admin.OutputTheStruct()

	if err != nil {
		fmt.Print("error")
	} else {
		appUser.OutputTheStruct()
		appUser.ClearUserName()
		appUser.OutputTheStruct()
	}

}
