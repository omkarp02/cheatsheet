package main

import (
	"fmt"
	"log"

	"github.com/elastic/go-elasticsearch/v8"
)

func main() {
	client, err := elasticsearch.NewClient(elasticsearch.Config{
		CloudID: "0f2afc16d1354324bdaf56f0db74705d:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGFiODFkMGJjMmY0ZTRmNzVhZTFjZTZmNzNhYjk3NmVhJDI0MTE2ZWNkNjhhOTQ1M2M5M2I5ZWIzNjM5MjFhMjUx",
		APIKey:  "DlNHLN8RQb66W3seueZrOg",
	})

	if err != nil {
		log.Fatal(err)
	}

	client.Indices.Create("my_index")
	fmt.Println(">>>>>>>> here process completed")
}
