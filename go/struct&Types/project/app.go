package main

import (
	"fmt"

	"example.com/project/note"
)

func main() {

	var title, content = getNoteData()
	newNote := note.New(title, content)
	newNote.Display()
	newNote.Save()

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
