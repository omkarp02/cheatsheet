package main

import "fmt"

type asf struct {
	hello string
}

func creathi() interface{} {
	return asf{
		hello: "sdfsdf",
	}
}

func main() {
	asdf := creathi()
	data, ok := asdf.(asf)
	if ok {
		fmt.Println(data)
	}

}
