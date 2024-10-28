package routes

import (
	"example.com/rest/middleware"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine) {

	//event routes
	server.GET("/events", getEvents)

	authenticated := server.Group("/")

	authenticated.Use(middleware.Authenticate)
	authenticated.POST("/events", createEvent)

	server.GET("/events/:id", getEvent)
	server.PUT("/events/:id", updateEvent)
	server.DELETE("/events/:id", deleteEvent)

	//user routes
	server.POST("/user", signUp)
	server.POST("/login", login)
	server.GET("/users", getAll)

}
