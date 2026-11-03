package main

import (
	"fmt"
	"log"

	"almoq33/app/models"
	"almoq33/bootstrap"
	"almoq33/config"
	"almoq33/routes"
	"github.com/gofiber/fiber/v2"
)

func main() {
	// 1. Initialize Config
	bootstrap.InitializeConfig()

	// 1.1 Initialize Logger (Zap)
	bootstrap.InitializeLogger()

	// 1.2 Initialize Cache (Redis)
	bootstrap.InitializeCache()

	// 2. Initialize Database
	bootstrap.InitializeDatabase()

	// 2.1 Migrate application models
	if err := bootstrap.DB.AutoMigrate(&models.ProjectRequest{}); err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}

	// 3. Initialize Fiber
	app := fiber.New(fiber.Config{
		AppName: config.Global.App.Name + " - almoq3 Framework",
	})

	// 4. Register Routes
	routes.Register(app)

	port := config.Global.App.Port
	if port == "" {
		port = "8080"
	}

	fmt.Printf("🚀 %s Started on port %s\n", config.Global.App.Name, port)
	log.Fatal(app.Listen(":" + port))
}
