package utils

import (
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var privateKey []byte
var publicKey []byte

// we can make this better find this do some research
func init() {

	var err error

	privateKey, err = os.ReadFile("private.pem")
	if err != nil {
		log.Fatal(err)
	}

	log.Println(privateKey, err)

	publicKey, err = os.ReadFile("private.pem")
	if err != nil {
		log.Fatal(err)
	}

}

func GenerateToken(payload interface{}) (string, error) {
	key, err := jwt.ParseRSAPrivateKeyFromPEM(privateKey)

	if err != nil {
		return "", err
	}

	now := time.Now().UTC()

	claims := make(jwt.MapClaims)
	claims["dat"] = payload                   // Our custom data.
	claims["exp"] = now.Add(time.Hour).Unix() // The expiration time after which the token must be disregarded.
	claims["iat"] = now.Unix()                // The time at which the token was issued.
	claims["nbf"] = now.Unix()                // The time before which the token must be disregarded.

	token, err := jwt.NewWithClaims(jwt.SigningMethodRS256, claims).SignedString(key)
	if err != nil {
		return "", err
	}

	return token, nil
}

func ValidateToken(token string) (interface{}, error) {
	key, err := jwt.ParseRSAPublicKeyFromPEM(publicKey)
	if err != nil {
		return "", err
	}

	tok, err := jwt.Parse(token, func(jwtToken *jwt.Token) (interface{}, error) {
		if _, ok := jwtToken.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, err
		}

		return key, nil
	})
	if err != nil {
		return nil, err
	}

	claims, ok := tok.Claims.(jwt.MapClaims)
	if !ok || !tok.Valid {
		return nil, err
	}

	return claims["dat"], nil
}
