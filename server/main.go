package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
    "github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func setupRoutes() {
	app := fiber.New()

	app.Use(logger.New(logger.Config{
		Format: "[${ip}]:${port} ${status} - ${method} ${path}\n",
	}))

	app.Use("/ws", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}

		return fiber.ErrUpgradeRequired
	})

	app.Get("/ws", websocket.New(func(c *websocket.Conn) {
		// c.Locals is added to the *websocket.Conn
	
		var (
			mt int
			msg []byte
			err error
		)

		for {
			if mt, msg, err = c.ReadMessage(); err != nil {
				log.Println("read: ", err)
				break
			}

			log.Printf("recv: %s", msg)

			if err = c.WriteMessage(mt, msg); err != nil {
				log.Println("write: ", err)
				break
			}
		}

	}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello from Fiber!")
	})

	log.Fatal(app.Listen(":3000"))
}

func main() {
	setupRoutes()
}