package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func init() {
	rand.Seed(time.Now().UnixNano())
}

func main() {
	go runHub()
	setupRoutes()
}

func generateRandomID(length int) string {
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[rand.Intn(len(charset))]
	}
	return string(b)
}

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
		var (
			messageType int
			msg         []byte
			err         error
		)

		register <- c
		defer func() {
			unregister <- c
			c.Close()
		}()

		for {
			if messageType, msg, err = c.ReadMessage(); err != nil {
				log.Println("read: ", err)
				return
			}
			log.Printf("recv: Type=%d	Msg=(%s)", messageType, msg)
			message := Message{}
			message.Type = 2
			err := json.Unmarshal(msg, &message)
			if err != nil {
				fmt.Println("Error unmarshalling JSON:", err)
				return
			}
			broadcast <- message
			if err = c.WriteJSON(message); err != nil {
				log.Println("write: ", err)
				return
			}
		}
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello from Fiber!")
	})

	log.Fatal(app.Listen(":3000"))
}
