package models

import (
	"context"
	"log"

	"example.com/maker/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Business struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name         string             `json:"name,omitempty" bson:"name"`
	Email        string             `json:"email,omitempty" bson:"email"`
	MobileNumber string             `json:"mobileNumber,omitempty" bson:"mobileNumber"`
	Address      `json:"address,omitempty" bson:"address,omitempty"`
	Timestamps   `bson:",inline"`
}

func businessColl() *mongo.Collection {
	return db.DB.Database("testdb").Collection("business")
}

func (c *Business) Validate() error {
	return validate.Struct(c)
}

func (bus *Business) Insert() error {

	ctx := context.TODO()

	bus.Timestamps = getCurrentTimestamps()

	log.Println(bus)

	_, err := businessColl().InsertOne(ctx, bus)
	if err != nil {
		log.Println("Error", err)
		return err
	}

	return nil

}

func (bus *Business) GetAll() ([]Business, error) {
	var business []Business
	ctx := context.TODO()

	cursor, err := businessColl().Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var bus Business
		cursor.Decode(&bus)
		business = append(business, bus)
	}

	return business, nil
}
