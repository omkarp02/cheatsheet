package main

import (
	"fmt"
	"log"
	"math/rand"
	"net"
	"sync"
	"time"

	"github.com/tidwall/resp"
)

func greet(doneChan chan string) {
	doneChan <- "ola"
}

func expensiveOPeration() {
	time.Sleep(2 * time.Second)
}

type Player struct {
	health int
}

func NewPlayer() *Player {
	return &Player{
		health: 100,
	}
}

func startUILoop(p *Player) {
	ticker := time.NewTicker(time.Second)
	for {
		fmt.Printf("player health: %d\r", p.health)
		<-ticker.C
	}
}

func startGameLoop(p *Player) {
	ticker := time.NewTicker(time.Millisecond * 300)
	for {
		p.health -= rand.Intn(40)
		if p.health <= 0 {
			fmt.Println("Game Over")
			break
		}
		<-ticker.C
	}
}

func fetchUser(respch chan any, wg *sync.WaitGroup) {
	time.Sleep(time.Millisecond * 100)

	respch <- "ola"
	wg.Done()
}

func fetchLike(respch chan any, wg *sync.WaitGroup) {
	time.Sleep(time.Millisecond * 100)

	respch <- "like"
	wg.Done()
}

type Ob struct {
	name string
}

type Tests struct {
	id string
	ob Ob
}

type TFilterList struct {
	Page  int      `query:"page,omitempty" validate:"required"`
	Limit int      `query:"limit,omitempty" validate:"required"`
	Types []string `query:"types,omitempty" validate:"dive,oneof=gender color"`
}

func main() {
	masterType := []string{"gender", "color"}
	masterType2 := []string{}

	for _, item := range masterType {
		masterType2 = append(masterType2, item)
	}

	fmt.Println(masterType, masterType2, "<<<<<<<")
}

func sdf(ff ...string) {

}

func sendREs(msg string, status int) {
	fmt.Println(msg, status)
}

func testBufio() {
	listener, err := net.Listen("tcp", ":8080")
	if err != nil {
		fmt.Println("Error starting server:", err)
		return
	}
	defer listener.Close()
	fmt.Println("Server is listening on port 8080")

	go handleAccept(listener)

	time.Sleep(2 * time.Second)

	conn, err := net.Dial("tcp", "localhost:8080")
	if err != nil {
		log.Fatal(conn)
	}

	raw := "*3\r\n$3\r\nSET\r\n$3\r\nfoo\r\n$3\r\nboo\r\n"

	conn.Write([]byte(raw))
	conn.Write([]byte(raw))
	conn.Write([]byte(raw))
	conn.Write([]byte(raw))
	conn.Write([]byte(raw))
	conn.Write([]byte(raw))

	b := make([]byte, 1024)
	conn.Read(b)
	fmt.Println(string(b))
	select {}
}

func handleAccept(listener net.Listener) {
	for {
		// Accept a new connection
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("Error accepting connection:", err)
			continue
		}
		fmt.Println("Accepted new connection")

		// Handle the connection in a separate goroutine
		go handleConnection(conn)
	}
}

func handleConnection(conn net.Conn) {
	defer conn.Close() // Close the connection when function ends

	// Use a buffered reader for efficient reading
	rd := resp.NewReader(conn)

	for {
		v, _, err := rd.ReadValue()
		if err != nil {
			log.Fatal(err)
		}

		fmt.Println(v.Array(), "<<<<<<<<")

		conn.Write([]byte("hello how are you ding"))
	}
}
