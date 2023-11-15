import { useEffect, useState } from "react"
import ChatInput from "../ChatInput/ChatInput";
import ChatHistory from "../ChatHistory/ChatHistory";

const WebSocketFC: React.FC = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const [clientID, setClientID] = useState<string>('');

    useEffect(() => { 
        const newSocket = new WebSocket("ws://localhost:3000/ws");
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
        const newMessage = JSON.parse(event.data);
        console.log("ClientID: ", newMessage.sender)
        if (newMessage.type === 1) {
            setClientID(newMessage.sender)
        } else {
            setMessages((prevMessages) => [...prevMessages, `${newMessage.sender}: ${newMessage.body}`]);
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