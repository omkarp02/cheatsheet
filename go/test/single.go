package main

import (
	"fmt"
	"sync"
)

type single struct {
}

var singleton *single
var lock = &sync.Mutex{}

func getInstance() *single {
	fmt.Println(singleton, "<<<<<<")
	if singleton == nil {
		lock.Lock()
		defer lock.Unlock()
		if singleton == nil {
			fmt.Println("Creating single instance now.")
			singleton = &single{}
		} else {
			fmt.Println("Single instance already created.")
		}

	} else {
		fmt.Println("Creating single instance now.")
	}

	return singleton
}
