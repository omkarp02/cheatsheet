package models

import (
	"context"
	"log"

	"example.com/maker/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Customer struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name         string             `json:"name,omitempty" bson:"name"`
	Email        string             `json:"email,omitempty" bson:"email"`
	MobileNumber string             `json:"mobileNumber,omitempty" bson:"mobileNumber"`
	Address      `json:"address,omitempty" bson:"address,omitempty"`
	Timestamps   `bson:",inline"`
}

func customerColl() *mongo.Collection {
	return db.DB.Database("testdb").Collection("customer")
}

func (c *Customer) Validate() error {
	return validate.Struct(c)
}

func (cust *Customer) Insert() error {

	ctx := context.TODO()

	cust.Timestamps = getCurrentTimestamps()

	log.Println(cust)

	_, err := customerColl().InsertOne(ctx, cust)
	if err != nil {
		log.Println("Error", err)
		return err
	}

	return nil

}

func (cust *Customer) GetAll() ([]Customer, error) {
	var customers []Customer
	ctx := context.TODO()

	cursor, err := customerColl().Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var cust Customer
		cursor.Decode(&cust)
		customers = append(customers, cust)
	}

	return customers, nil
}
