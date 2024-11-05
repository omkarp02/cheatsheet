package models

import (
	"context"
	"log"
	"time"

	"example.com/maker/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Item struct {
	name        string
	quantity    int16
	unit        int32
	price       int32
	vat         int32
	total       int32
	description string
}

type Invoice struct {
	ID            primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Logo          string             `json:"logo,omitempty" bson:"logo,omitempty"`
	InvoiceNumber string             `json:"invoiceNumber,omitempty" bson:"invoiceNumber,omitempty"`
	IssueDate     time.Time          `json:"issueDate,omitempty" bson:"issueDate,omitempty"`
	BilledFromId  primitive.ObjectID `json:"billedFromId,omitempty" bson:"billedFromId,omitempty"`
	BilledToId    primitive.ObjectID `json:"billedToId,omitempty" bson:"billedToId,omitempty"`
	DueDate       time.Time          `json:"dueDate,omitempty" bson:"dueDate,omitempty"`
	DeliveryDate  time.Time          `json:"deliveryDate,omitempty" bson:"deliveryDate,omitempty"`
	Item          []Item             `json:"item,omitempty" bson:"item,omitempty"`
	Discount      int16              `json:"discount,omitempty" bson:"discount,omitempty"`
	Note          string             `json:"note,omitempty" bson:"note,omitempty"`
	Total         int32              `json:"total,omitempty" bson:"total,omitempty"`
	Timestamps    `bson:",inline"`
}

func invoiceColl() *mongo.Collection {
	return db.DB.Database("testdb").Collection("invoice")
}

func (c *Invoice) Validate() error {
	return validate.Struct(c)
}

func (inv *Invoice) Insert() error {

	ctx := context.TODO()

	inv.Timestamps = getCurrentTimestamps()

	_, err := invoiceColl().InsertOne(ctx, inv)
	if err != nil {
		log.Println("Error", err)
		return err
	}

	return nil

}

func (inv *Invoice) GetAll() ([]Invoice, error) {
	var invoices []Invoice
	ctx := context.TODO()

	cursor, err := invoiceColl().Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var inv Invoice
		cursor.Decode(&inv)
		invoices = append(invoices, inv)
	}

	return invoices, nil
}
