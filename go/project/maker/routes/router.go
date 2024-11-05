package routes

import (
	"example.com/maker/utils"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine) {

	//event routes

	user := server.Group("/user")

	user.POST("/", createUser)
	user.GET("/all", getAllUser)
	user.POST("/login", utils.MakeHandler(loginUser))

	customer := server.Group("/customer")

	customer.POST("/", utils.MakeHandler(createCustomer))
	customer.GET("/all", utils.MakeHandler(getAllCustomer))

	business := server.Group("/business")

	business.POST("/", utils.MakeHandler(createBusiness))
	business.GET("/all", utils.MakeHandler(getAllBusiness))
}
