package utils

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type APIError struct {
	StatusCode int `json:"statusCode"`
	Msg        any `json:"msg"`
}

func (e APIError) Error() string {
	return fmt.Sprintf("api error: %d", e.StatusCode)
}

func NewAPIError(statusCode int, err error) APIError {
	return APIError{
		StatusCode: statusCode,
		Msg:        err.Error(),
	}
}

// *here we can check the error type like if it is validatin error and accordingly we can process or requrest
func InvalidRequestData(err error) APIError {
	return APIError{
		StatusCode: http.StatusUnprocessableEntity,
		Msg:        err.Error(),
	}
}

func InvalidCred() APIError {
	return NewAPIError(http.StatusUnauthorized, fmt.Errorf("invalid credentials"))
}

func InvalidJSON() APIError {
	return NewAPIError(http.StatusBadRequest, fmt.Errorf("invalid json request data"))
}

type APIFunc func(ctx *gin.Context) error

func MakeHandler(h APIFunc) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		if err := h(ctx); err != nil {
			if apiErr, ok := err.(APIError); ok {
				ctx.JSON(apiErr.StatusCode, apiErr)
			} else {
				errResp := map[string]any{
					"statusCode": http.StatusInternalServerError,
					"msg":        "Internal Server Error",
				}

				ctx.JSON(http.StatusBadRequest, errResp)
			}
		}
	}
}
