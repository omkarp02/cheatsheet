package routes

import (
	"fmt"
	"net/http"
	"strconv"

	"example.com/rest/models"
	"github.com/gin-gonic/gin"
)

func getEvents(ctx *gin.Context) {
	events, err := models.GetAllEvents()

	fmt.Println(err)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": "could not featch events"})
		return
	}

	ctx.JSON(http.StatusOK, events)
}

func createEvent(context *gin.Context) {

	var event models.Event
	err := context.ShouldBindJSON(&event)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data."})
		return
	}

	userId := context.GetInt64("userId")

	event.ID = 1
	event.UserID = userId

	err = event.Save()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create event. Try again later."})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"message": "Event created!", "event": event})
}

func getEvent(ctx *gin.Context) {
	eventId, err := strconv.ParseInt(ctx.Param("id"), 10, 64)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"msg": "Something went wrong"})
		return
	}

	event, err := models.GetEventById(eventId)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"msg": "Internal server error"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Event created!", "event": event})
}

func updateEvent(ctx *gin.Context) {
	eventId, err := strconv.ParseInt(ctx.Param("id"), 10, 64)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"msg": "Something went wrong"})
		return
	}

	var updatedEvent models.Event
	err = ctx.ShouldBindJSON(&updatedEvent)

	fmt.Println(err, "<<<<<<<<<")

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"msg": "Something went wrong"})
		return
	}

	updatedEvent.ID = eventId

	err = updatedEvent.UpdateEventById()

	fmt.Println(err)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"msg": "Something went wrong"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"msg": "updated"})

}

func deleteEvent(ctx *gin.Context) {
	eventId, err := strconv.ParseInt(ctx.Param("id"), 10, 64)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"msg": "Something went wrong"})
		return
	}

	err = models.DeleteEventById(eventId)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"msg": "Something went wrong"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"msg": "deleted"})

}
