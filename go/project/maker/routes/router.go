package routes

import (
	"example.com/maker/utils"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine) {

	//event routes
	server.POST("/user", createUser)
	server.GET("/users", getAllUser)
	server.POST("/login", utils.MakeHandler(loginUser))
}
