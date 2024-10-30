package main

import (
	"context"
	"log"
	"time"

	"example.com/maker/db"
	"example.com/maker/routes"
	"github.com/gin-gonic/gin"
)

func main() {

	db, err := db.ConnectToDB()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	defer func() {
		if err = db.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	if err != nil {
		log.Panic(err)
	}

	server := gin.Default()
	routes.RegisterRoutes(server)

	server.Run()

}
