package models

import (
	"context"
	"log"
	"time"

	"example.com/maker/db"
	"go.mongodb.org/mongo-driver/mongo"
)

type User struct {
	ID        int       `bson:"_id, omitempty"`
	Email     string    `bson:"task"`
	Password  string    `bson:"password"`
	CreatedAt time.Time `bson:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt"`
}

func returnCollectionPointer() *mongo.Collection {
	return db.DB.Database("testdb").Collection("users")
}

func (u User) Insert() error {
	_, err := returnCollectionPointer().InsertOne(context.TODO(), User{
		Email:     u.Email,
		Password:  u.Password,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	})

	if err != nil {
		log.Println("Error >>>>>>>>>>>>>>>>>", err)
		return err
	}
	return nil
}
