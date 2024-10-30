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

	uri := "mongodb+srv://opwebdev:Omkar^100@omkar.iuqcpfi.mongodb.net/testdb?retryWrites=true&w=majority"
	clientOptions := options.Client().ApplyURI(uri)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	DB, err = mongo.Connect(ctx, clientOptions)

	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	// if err = DB.Ping(ctx, &readpref.ReadPref{}); err != nil {
	// 	log.Fatal(">>>>>>>>", err)
	// }

	log.Println("Connected to Db ")

	return DB, err

}
