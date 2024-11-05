package main

import (
	"bytes"
	"context"
	"log"
	"net/http"
	"time"

	"example.com/maker/db"
	"example.com/maker/routes"

	"github.com/SebastiaanKlippert/go-wkhtmltopdf"
	"github.com/gin-gonic/gin"
)

func main() {

	db, err := db.ConnectToDB()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	defer func() {
		if err = db.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	if err != nil {
		log.Panic(err)
	}

	server := gin.Default()
	routes.RegisterRoutes(server)
	server.POST("/generate-pdf", generatePDF)

	server.Run()

}

func generatePDF(ctx *gin.Context) {
	htmlContent := `<html><body><h1>Hello, PDF!</h1><p>This is a PDF generated from HTML.</p></body></html>`

	pdfg, err := wkhtmltopdf.NewPDFGenerator()
	if err != nil {
		log.Println("Failed to create PDF generator:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Could not initialize PDF generator"})
		return
	}

	page := wkhtmltopdf.NewPageReader(bytes.NewReader([]byte(htmlContent)))
	pdfg.AddPage(page)

	// Generate the PDF
	if err := pdfg.Create(); err != nil {
		log.Println("Failed to generate PDF:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate PDF"})
		return
	}

	ctx.Header("Content-Type", "application/pdf")
	ctx.Header("Content-Disposition", `attachment; filename="output.pdf"`)

	// Send the PDF as response
	ctx.Data(http.StatusOK, "application/pdf", pdfg.Bytes())

}
