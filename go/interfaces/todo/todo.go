package todo

import (
	"encoding/json"
	"fmt"
	"os"
)

type Todo struct {
	Text string `json:"content"`
}

func (todo Todo) Display() {
	fmt.Println("title", todo.Text)
}

func (todo Todo) Save() {
	fileName := "todo.json"

	json, _ := json.Marshal(todo)

	os.WriteFile(fileName, json, 0644)
}

func New(text string) *Todo {
	return &Todo{
		Text: text,
	}
}
