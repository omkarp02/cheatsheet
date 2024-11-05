package main

func greet() {

}

func main() {
	// server := NewApiServer(":8080")

	// server.Run()

	// server := NewServer(":3000")

	// go func() {
	// 	for msg := range server.msgch {
	// 		fmt.Println("msg", string(msg.from), string(msg.payload))
	// 	}
	// }()

	// log.Fatal(server.Start())

	doneChan := make(chan bool)
	go greet()
	<-doneChan

}
