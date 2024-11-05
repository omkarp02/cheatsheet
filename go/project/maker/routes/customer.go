package routes

import (
	"log"
	"net/http"

	"example.com/maker/models"
	"example.com/maker/utils"
	"github.com/gin-gonic/gin"
)

// asd
func createCustomer(ctx *gin.Context) error {
	var customer models.Customer

	if err := ctx.ShouldBindJSON(&customer); err != nil {
		log.Println(err)

		return utils.InvalidJSON()
	}

	if err := customer.Insert(); err != nil {
		return utils.InvalidRequestData(err)
	}

	ctx.JSON(http.StatusCreated, gin.H{"msg": "Success"})
	return nil

}

func getAllCustomer(ctx *gin.Context) error {
	var customer models.Customer

	customers, err := customer.GetAll()

	if err != nil {
		return err
	}

	ctx.JSON(http.StatusCreated, gin.H{"msg": "Success", "data": customers})
	return nil
}
