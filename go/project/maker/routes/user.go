package routes

import (
	"log"
	"net/http"

	"example.com/maker/models"
	"example.com/maker/utils"
	"github.com/gin-gonic/gin"
)

func createUser(ctx *gin.Context) {
	var user models.User

	if err := ctx.ShouldBindJSON(&user); err != nil {
		log.Println(err)
		ctx.JSON(http.StatusBadRequest, gin.H{"msg": "Invalid data"})
		return
	}

	if err := user.Insert(); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"msg": "Something went wrong"})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"msg": "Success"})
}

func getAllUser(ctx *gin.Context) {
	var user models.User

	users, err := user.GetAll()

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"msg": "Something went wrong"})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"msg": "Success", "data": users})
}

func loginUser(ctx *gin.Context) error {
	var user models.User

	if err := ctx.ShouldBindJSON(&user); err != nil {
		return utils.InvalidJSON()
	}

	if err := user.Validate(); err != nil {
		return utils.InvalidRequestData(err)
	}

	user, err := user.ValidateCredentials()
	if err != nil {
		return err
	}

	token, err := utils.GenerateToken(user)
	if err != nil {
		return err
	}

	ctx.JSON(http.StatusCreated, gin.H{"msg": "Success", "token": token})
	return nil
}
