package routes

import (
	"fmt"
	"net/http"

	"example.com/rest/models"
	"example.com/rest/utils"
	"github.com/gin-gonic/gin"
)

func signUp(ctx *gin.Context) {
	var user models.User
	err := ctx.ShouldBindJSON(&user)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data."})
		return
	}

	err = user.Save()

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Soemthing went wrong"})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"msg": "success"})

}

func getAll(ctx *gin.Context) {

	users, err := models.GetAll()

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": "Sowmthing went wrong"})
		return
	}

	ctx.JSON(http.StatusOK, users)
}

func login(ctx *gin.Context) {
	var user models.User
	err := ctx.ShouldBindJSON(&user)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data."})
		return
	}

	err = user.ValidateCredentials()

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorized"})
		return
	}

	token, err := utils.GenerateToken(user.Email, user.ID)

	fmt.Println(err)

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "internal server error"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"msg": "login success", "token": token})

}
