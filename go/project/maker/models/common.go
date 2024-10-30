package models

import "time"

type Timestamps struct {
	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt" bson:"updatedAt"`
}

type Address struct {
	Street       string `json:"street,omitempty" bson:"street"`
	City         string `json:"city,omitempty" bson:"city"`
	Pincode      int32  `json:"pincode,omitempty" bson:"pincode"`
	State        string `json:"state,omitempty" bson:"state"`
	Country      string `json:"country,omitempty" bson:"country"`
	AddressLine2 string `json:"addressLine2,omitempty" bson:"addressLine2"`
}

func getCurrentTimestamps() Timestamps {
	return Timestamps{
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}
