package main

import "fmt"

func main() {
	prices := []float64{10, 20, 30}
	taxRates := []float64{0, 0.07, 0.1, 0.15}

	result := make(map[float64][]float64)

	for _, taxRate := range taxRates {
		taxIncludesPrices := make([]float64, len(prices))
		for priceIndex, price := range prices {
			taxIncludesPrices[priceIndex] = price * (1 + taxRate)
		}
		result[taxRate] = taxIncludesPrices
	}

	fmt.Println(result)

}
