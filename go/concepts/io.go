package main

import (
	"fmt"
	"io"
	"os"
)

func writer() {
	file, _ := os.Create("file.txt")

	writer := io.Writer(file)
	n, err := writer.Write([]byte("Hello"))
	fmt.Println(n, err)

	n, err = io.WriteString(writer, "!")
}

func reader() {
	file, err := os.Open("file.txt")
	if err != nil {
		fmt.Println(">>>>>>>>", err)
	}
	reader := io.Reader(file)

	buffer := make([]byte, 10)

	n, err := reader.Read(buffer)

	// here we can also use readall
	// buffer, err = io.ReadAll(reader)

	//here is for loop
	// buffer2 := make([]byte, 1)

	// for {

	// 	_, err := reader.Read(buffer2)
	// 	if err != nil {
	// 		fmt.Println("........", err)
	// 		break
	// 	}
	// }

	// fmt.Println("for loop buffer", string(buffer2))

	if err != nil {
		fmt.Println(">>>>>>>>>", err)
	}

	fmt.Println(string(buffer), n)
	file.Close()

}

func ioTest() {

	// writer(file)

	reader()

}
