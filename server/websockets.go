package main

import (
	"log"
	"sync"
	"sync/atomic"

	"github.com/gofiber/contrib/websocket"
)

type client struct {
	ID        string
	isClosing bool
	mu        sync.Mutex
}

type Message struct {
	ID     int64  `json:"id"`
	Type   int    `json:"type"`
	Sender string `json:"sender"`
	Body   string `json:"body"`
}

var (
	clients          = make(map[*websocket.Conn]*client)
	register         = make(chan *websocket.Conn)
	broadcast        = make(chan Message)
	unregister       = make(chan *websocket.Conn)
	messageID  int64 = 0
)

func runHub() {
	for {
		select {
		case connection := <-register:
			clients[connection] = &client{
				ID: generateRandomID(5),
			}
			go func(connection *websocket.Conn, c *client) {
				c.mu.Lock()
				defer c.mu.Unlock()
				if c.isClosing {
					return
				}
				message := Message{
					Type:   1,
					Sender: c.ID,
				}
				if err := connection.WriteJSON(message); err != nil {
					c.isClosing = true
					log.Println("write error: ", err)

					connection.WriteMessage(websocket.CloseMessage, []byte{})
					connection.Close()
					unregister <- connection
				}
			}(connection, clients[connection])
			log.Printf("Client %s connected", clients[connection].ID)

		case message := <-broadcast:
			atomic.AddInt64(&messageID, 1)
			message.ID = atomic.LoadInt64(&messageID)
			log.Printf("message received: %+v\n", message)
			for connection, c := range clients {
				if c.ID == message.Sender {
					continue
				}
				go func(connection *websocket.Conn, c *client) {
					c.mu.Lock()
					defer c.mu.Unlock()
					if c.isClosing {
						return
					}
					if err := connection.WriteJSON(message); err != nil {
						c.isClosing = true
						log.Println("write error: ", err)

						connection.WriteMessage(websocket.CloseMessage, []byte{})
						connection.Close()
						unregister <- connection
					}
				}(connection, c)
			}

		case connection := <-unregister:
			log.Printf("Client %s disconnected", clients[connection].ID)
			delete(clients, connection)
		}
	}
}
