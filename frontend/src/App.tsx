import './index.css'
import { useEffect, useState } from "react"
import Input from './components/Input';
import ChatHistory from "./components/ChatHistory";
import Sidebar from './components/Sidebar';
import NameInput from './components/NameInput';
import Chat from './components/Chat';
import Message from "types";

function App() {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [clientID, setClientID] = useState<string>('');
    const [inputData, setInputData] = useState<string>('');

    useEffect(() => { 
        let socketUrl = "ws://" + window.location.hostname + ":3000/ws";
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


    let userName: string = "";

    const handleWebSocketMessage = (event: MessageEvent) => {
        const newMessage: Message = JSON.parse(event.data);
        console.log("ClientID: ", newMessage.sender)
        if (newMessage.type === 1) {
            setClientID(newMessage.sender)
        } else {
            setMessages((prevMessages) => [...prevMessages, 
            {
                id: newMessage.id,
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

    const handleSendMessage = () => {
      if (inputData.trim() !== '') {
          sendMessage(
              JSON.stringify({
                  sender: clientID,
                  body: inputData
              })
          )
          setInputData('');
      }
  };


  const handleInputChange = (value: string) => {
        setInputData(value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
          handleSendMessage();
      }
  };

  const handleSubmitName = (name: string) => {
    userName = name;
    console.log(userName);
  }

    return (
        <div className="flex grow max-h-screen">
            <Sidebar className="overflow-y-hidden">
                <NameInput onSubmitName={handleSubmitName}/>
            </Sidebar>
            <Chat className="mx-2 relative overflow-x-hidden">
                <ChatHistory messages={messages} className=""/>
                <Input value={inputData} placeholder="Type a message..." onInputChange={handleInputChange} onKeyDown={handleInputKeyDown} className="fixed bottom-2 w-9/12"/>
            </Chat>
        </div>
    )
}

export default App;