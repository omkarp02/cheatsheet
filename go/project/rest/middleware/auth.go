package middleware

import (
	"net/http"

	"example.com/rest/utils"
	"github.com/gin-gonic/gin"
)

func Authenticate(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")

	if token == "" {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "token is needed"})
		return
	}

	err := utils.VerifyToken(token)

	if err != nil {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"msg": "slkdfjlsdf"})
		return
	}

	context.Set("userId", 1)
	context.Next()

}
