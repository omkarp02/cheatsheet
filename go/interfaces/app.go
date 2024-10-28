package main

import (
	"fmt"

	"example.com/interface/note"
	"example.com/interface/todo"
)

type saver interface {
	Save()
}

func main() {

	var title, content = getNoteData()
	newNote := note.New(title, content)
	newNote.Display()
	newNote.Save()

	var text = getTodoData()
	newTodo := todo.New(text)
	newTodo.Display()

	SaveData(newTodo)
}

func SaveData(data saver) {
	data.Save()
	fmt.Println("Data saved successfully")
}

func getTodoData() string {
	var text = getUserInput("Todo text:")

	return text
}

func getNoteData() (string, string) {
	var title = getUserInput("Note title:")
	var content = getUserInput("Note content:")

	return title, content
}

func getUserInput(prompt string) string {
	var val string
	fmt.Println(prompt)
	fmt.Scanln(&val)
	return val
}
