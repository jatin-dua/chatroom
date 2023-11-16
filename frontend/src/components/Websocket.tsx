import { useEffect, useState } from "react"
import ChatInput from "./ChatInput";
import ChatHistory from "./ChatHistory";
import Message from "types";

const WebSocketFC: React.FC = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [clientID, setClientID] = useState<string>('');

    useEffect(() => { 
        let socketUrl;
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
          socketUrl = "ws://localhost:3000/ws";
        } else {
          socketUrl = `ws://192.168.1.7:3000/ws`;
        }
        const newSocket = new WebSocket(socketUrl);        
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.addEventListener('message', handleWebSocketMessage);

            socket.addEventListener('open', () => {
                console.log('WebSocket connection successful');
            });

            socket.addEventListener('close', () => {
                console.log('WebSocket connection closed');
            });

            socket.addEventListener('error', (error) => {
                console.error('WebSocket error: ', error);
            });
        }

        return () => {
            if (socket) {
                socket.removeEventListener('message', handleWebSocketMessage);
                socket.removeEventListener('open', () => {});
                socket.removeEventListener('close', () => {});
                socket.removeEventListener('error', () => {});
            }
        }
    }, [socket]);


    const handleWebSocketMessage = (event: MessageEvent) => {
        const newMessage: Message = JSON.parse(event.data);
        console.log("ClientID: ", newMessage.sender)
        if (newMessage.type === 1) {
            setClientID(newMessage.sender)
        } else {
            setMessages((prevMessages) => [...prevMessages, 
            {
                type: newMessage.type,
                sender: newMessage.sender,
                body: newMessage.body,
            }]);
        }
    };

    const sendMessage = (message: string) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(message);
        }
    };

    return (
        <>
            <ChatHistory messages={messages}/>
            <ChatInput clientID={clientID} onSendMessage={sendMessage}/>
        </>
    )
}

export default WebSocketFC;