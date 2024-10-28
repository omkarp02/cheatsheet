package main

import (
	"log"

	"example.com/maker/db"
	"example.com/maker/routes"
	"github.com/gin-gonic/gin"
)

func main() {

	_, err := db.ConnectToDB()

	if err != nil {
		log.Panic(err)
	}

	server := gin.Default()
	routes.RegisterRoutes(server)

	server.Run()

}
