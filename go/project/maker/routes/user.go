package routes

import (
	"net/http"

	"example.com/maker/models"
	"github.com/gin-gonic/gin"
)

func createUser(ctx *gin.Context) {
	var user models.User

	if err := ctx.ShouldBindJSON(&user); err != nil {
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
