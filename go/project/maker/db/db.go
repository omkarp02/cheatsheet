package db

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Client

func ConnectToDB() (*mongo.Client, error) {
	var err error

	uri := "mongodb://127.0.0.1:27017/testdb"
	clientOptions := options.Client().ApplyURI(uri)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	DB, err = mongo.Connect(ctx, clientOptions)

	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	log.Println("Connected to Db ")

	return DB, err

}
