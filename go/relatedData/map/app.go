package main

import (
	"fmt"
)

type floatMap map[string]float64

func (m floatMap) output() {
	fmt.Println(m)
}

func main() {
	websites := map[string]string{
		"google":    "https://google.com",
		"aws":       "https://aws.com",
		"animelist": "https://animelist.com",
	}

	websites["linkedIn"] = "https://linkedin.com"

	fmt.Println(websites)

	delete(websites, "animelist")
	fmt.Println(websites)

	//make function

	//here we are saying capcity to be 3 so initial 3 element go don't have to realocate memory but aftrer that he had to
	courseRating := make(floatMap, 3)

	courseRating["go"] = 4.3
	courseRating["react"] = 4.5
	courseRating["goasdf"] = 4.6
	courseRating["goasdfsdf"] = 4.6

	courseRating.output()

	fmt.Println(courseRating)

	for key, value := range courseRating {
		fmt.Println(key, value)
	}

}
