package models

import (
	"context"
	"log"

	"example.com/maker/db"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Customer struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name         string             `json:"name,omitempty" bson:"_id,name"`
	Email        string             `json:"email,omitempty" bson:"email"`
	MobileNumber string             `json:"mobileNumber,omitempty" bson:"mobileNumber"`
	Address
	Timestamps `bson:",inline"`
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

	_, err := customerColl().InsertOne(ctx, cust)
	if err != nil {
		log.Println("Error", err)
		return err
	}

	return nil

}
