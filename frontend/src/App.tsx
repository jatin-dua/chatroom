import './index.css'
import { useEffect, useState } from "react"
import Input from './components/Input';
import ChatHistory from "./components/ChatHistory";
import Sidebar from './components/Sidebar';
import NameInput from './components/NameInput';
import Chat from './components/Chat';
import Panel from './components/Panel';
import Message from "types";

function App() {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userID, setUserID] = useState<string>('');
    const [name, setName] = useState<string>('');
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

    const handleWebSocketMessage = (event: MessageEvent) => {
        const newMessage: Message = JSON.parse(event.data);
        console.log("userID: ", newMessage.senderID)
        if (newMessage.type === 1) {
            setUserID(newMessage.senderID)
        } else {
            setMessages((prevMessages) => [...prevMessages, 
            {
                id: newMessage.id,
                type: newMessage.type,
                senderID: newMessage.senderID,
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
                  senderID: userID,
                  sender: name,
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
    setName(name);
  }

    return (
        <div className="flex grow max-h-screen">
            <Sidebar className="overflow-y-hidden">
                { name === '' && <NameInput onSubmitName={handleSubmitName} /> }
            </Sidebar>
            <Chat className="mx-2 relative overflow-x-hidden">
            <Panel className="item-center justify-center sticky top-0"><h2 className="text-white text-3xl font-semibold">Messages</h2></Panel>
                <ChatHistory messages={messages} userID={userID} className=""/>
                <Panel className="sticky bottom-1 w-full"><Input value={inputData} placeholder={ name === '' ?  "Set a Username to send messages" : "Type a message"} onInputChange={handleInputChange} onKeyDown={handleInputKeyDown} disabled={ name === '' } className="w-10/12 h-12 items-center ml-4"/></Panel>
            </Chat>
        </div>
    )
}

export default App;