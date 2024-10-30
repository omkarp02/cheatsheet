package models

import (
	"context"
	"time"

	"example.com/maker/db"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Customer struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name         string             `json:"name,omitempty" bson:"_id,name"`
	Email        string             `json:"email,omitempty" bson:"email"`
	MobileNumber string             `json:"mobileNumber,omitempty" bson:"mobileNumber"`
	Street       string             `json:"street,omitempty" bson:"street"`
	City         string             `json:"city,omitempty" bson:"city"`
	Pincode      int32              `json:"pincode,omitempty" bson:"pincode"`
	State        string             `json:"state,omitempty" bson:"state"`
	Country      string             `json:"country,omitempty" bson:"country"`
	AddressLine2 string             `json:"addressLine2,omitempty" bson:"addressLine2"`
	CreatedAt    time.Time          `json:"createdAt" bson:"createdAt"`
	UpdatedAt    time.Time          `json:"updatedAt" bson:"updatedAt"`
}

func customerColl() *mongo.Collection {
	return db.DB.Database("testdb").Collection("customer")
}

func (c *Customer) Validate() error {
	return validate.Struct(c)
}

func (c *Customer) Insert() {

	ctx := context.TODO()

	customerColl().InsertOne(ctx, c)
}
