package routes

import (
	"github.com/gofiber/fiber/v2"
)

func Register(app *fiber.App) {
	// API routes must be registered before the SPA fallback in web.go.
	RegisterAPIRoutes(app)
	RegisterWebRoutes(app)
}
