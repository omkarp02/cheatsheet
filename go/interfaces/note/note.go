package note

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"
)

type Note struct {
	Title     string    `json:"title"` //so this is metadata this will be used by the json package as key like {title: "somevalue"}
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}

func (note Note) Display() {
	fmt.Println("title", note.Title, "Content", note.Content)
}

func (note Note) Save() {
	fileName := strings.ReplaceAll(note.Title, " ", "_")
	fileName = strings.ToLower(fileName) + ".json"

	json, _ := json.Marshal(note)

	os.WriteFile(fileName, json, 0644)
}

func New(title, Content string) *Note {
	return &Note{
		Title:     title,
		Content:   Content,
		CreatedAt: time.Now(),
	}
}
