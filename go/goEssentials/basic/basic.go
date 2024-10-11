package main

import (
	"fmt"
	"math"
)

func main() {

	const inflationRate = 2.5
	var investAmt float64     //here we just initialsed so go store default value there
	var years float64 = 10    //we we are giving int but go store this as float
	expectedReturnRate := 5.5 //here you are saying you are happy with inferred type by go

	fmt.Print("Investment Amount: ")
	fmt.Scan(&investAmt)

	// var futureVal = float64(investAmt) * math.Pow(1+expectedReturnRate/100, float64(years)) //here we can do time conversion like this
	var futureVal = investAmt * math.Pow(1+expectedReturnRate/100, years)
	futureRealValue := futureVal / math.Pow(1+inflationRate/100, years)

	// fmt.Println("This is the future value", int64(futureVal))

	// fmt.Printf("Futre value: %v\n Future real value %v \n", int64(futureVal), int64(futureRealValue))

	//here we can format value accordingly here you are saying that %.1 means have 1 decimal at end
	fmt.Printf("Futre value: %.1f \n Future real value %.1f \n", futureVal, futureRealValue)

	formattedFv := fmt.Sprintf("Futre value: %.1f \n", futureVal)

	fmt.Println(formattedFv)

	fmt.Println("this is value: ", int64(futureRealValue))

	fmt.Println(outputText("asdf", 234))

	//here we are doing a exccersise regarding a function

	var res = sum(1, 2)

	fmt.Println(res)

}

func sum(num1 int64, num2 int64) int64 {
	return num1 + num2
}

func outputText(text string, number int64) (string, int64) {
	fmt.Print(text, number)

	dummy := "asdf"

	return dummy, 23
}

// herle this the practice problme
// func main() {
// 	var profit float64
// 	var interest float64
// 	var value float64

// 	fmt.Scan(&profit)
// 	fmt.Scan(&interest)
// 	fmt.Scan(&value)

// 	finalValue := profit + interest + value

// 	fmt.Print(finalValue)

// }
