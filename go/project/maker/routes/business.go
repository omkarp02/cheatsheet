package routes

import (
	"log"
	"net/http"

	"example.com/maker/models"
	"example.com/maker/utils"
	"github.com/gin-gonic/gin"
)

// asd
func createBusiness(ctx *gin.Context) error {
	var business models.Business

	if err := ctx.ShouldBindJSON(&business); err != nil {
		log.Println(err)

		return utils.InvalidJSON()
	}

	if err := business.Insert(); err != nil {
		return utils.InvalidRequestData(err)
	}

	ctx.JSON(http.StatusCreated, gin.H{"msg": "Success"})
	return nil

}

func getAllBusiness(ctx *gin.Context) error {
	var business models.Business

	businesses, err := business.GetAll()

	if err != nil {
		return err
	}

	ctx.JSON(http.StatusCreated, gin.H{"msg": "Success", "data": businesses})
	return nil
}
