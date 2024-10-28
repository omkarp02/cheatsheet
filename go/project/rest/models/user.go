package models

import (
	"errors"
	"fmt"

	"example.com/rest/db"
	"example.com/rest/utils"
)

type User struct {
	ID       int64
	Email    string `binding: "required"`
	Password string `binding: "required"`
}

func (u User) Save() error {
	query := "INSERT INTO users(email, password) VALUES (?, ?)"

	stmt, err := db.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	hashedPassword, err := utils.HashPassword(u.Password)

	if err != nil {
		return err
	}

	result, err := stmt.Exec(u.Email, hashedPassword)

	if err != nil {
		return err
	}

	userId, err := result.LastInsertId()

	u.ID = userId

	return err
}

func GetAll() ([]User, error) {
	query := "SELECT * FROM users"

	rows, err := db.DB.Query(query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var users []User

	for rows.Next() {
		var user User
		err := rows.Scan(&user.ID, &user.Email, &user.Password)

		if err != nil {
			return nil, err
		}

		users = append(users, user)
	}

	return users, nil
}

func (u User) ValidateCredentials() error {
	query := "SELECT id, password FROM users WHERE email = ?"
	row := db.DB.QueryRow(query, u.Email)

	var retrievedPassword string
	err := row.Scan(&u.ID, &retrievedPassword)

	fmt.Print(err, u.Email, u.Password)

	if err != nil {
		return errors.New("Cred invalid")
	}

	fmt.Print(err, u.Email, retrievedPassword, u.Password)

	passIsValid := utils.CheckPassHash(u.Password, retrievedPassword)

	fmt.Print(passIsValid)

	if !passIsValid {
		return errors.New("Cred invalid")
	}

	return nil
}
