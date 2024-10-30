package models

import (
	"context"
	"log"

	"example.com/maker/db"
	"example.com/maker/utils"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type User struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Email    string             `form:"email" validate:"required" json:"email" bson:"email"`
	Password string             `form:"password" validate:"required" json:"password" bson:"password"`
	// CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
	// UpdatedAt time.Time          `json:"updatedAt" bson:"updatedAt"`
	Timestamps `bson:",inline"`
}

var validate *validator.Validate = validator.New(validator.WithRequiredStructEnabled())

func userColl() *mongo.Collection {
	return db.DB.Database("testdb").Collection("users")
}

func (u *User) Validate() error {
	return validate.Struct(u)
}

func (u *User) Insert() error {

	hashedPass, err := utils.HashPassword(u.Password)

	if err != nil {
		return err
	}

	_, err = userColl().InsertOne(context.TODO(), User{
		Email:      u.Email,
		Password:   hashedPass,
		Timestamps: getCurrentTimestamps(),
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

	cursor, err := userColl().Find(ctx, bson.M{})

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

func (u *User) ValidateCredentials() (User, error) {

	var user User

	ctx := context.TODO()
	if err := userColl().FindOne(ctx, bson.M{"email": u.Email}).Decode(&user); err != nil {
		return User{}, utils.InvalidCred()
	}

	isPassValid := utils.CheckPasswordHash(u.Password, user.Password)

	if !isPassValid {
		return User{}, utils.InvalidCred()
	}

	return user, nil
}
