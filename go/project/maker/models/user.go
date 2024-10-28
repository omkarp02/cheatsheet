package models

import (
	"context"
	"log"
	"time"

	"example.com/maker/db"
	"example.com/maker/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type User struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Email     string             `json:"task" bson:"task"`
	Password  string             `json:"password" bson:"password"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time          `json:"updatedAt" bson:"updatedAt"`
}

func returnCollectionPointer() *mongo.Collection {
	return db.DB.Database("testdb").Collection("users")
}

func (u *User) Insert() error {

	hashedPass, err := utils.HashPassword(u.Password)

	_, err = returnCollectionPointer().InsertOne(context.TODO(), User{
		Email:     u.Email,
		Password:  hashedPass,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	})

	if err != nil {
		log.Println("Error", err)
		return err
	}
	return nil
}

func (u *User) GetAll() ([]User, error) {
	var users []User

	ctx := context.TODO()

	cursor, err := returnCollectionPointer().Find(ctx, bson.M{})

	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var user User
		cursor.Decode(&user)
		users = append(users, user)
	}

	return users, nil

}
