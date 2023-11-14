package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

func setupRoutes() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello from Fiber!")
	})

	log.Fatal(app.Listen(":3000"))
}

func main() {
	setupRoutes()
}