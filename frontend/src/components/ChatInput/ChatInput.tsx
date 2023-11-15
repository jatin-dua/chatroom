import { useState } from "react";

interface ChatInputProps {
    clientID: string
    onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ clientID, onSendMessage }) => {
    const [messageInput, setMessageInput] = useState<string>('');

    const sendMessage = () => {
        if (messageInput.trim() !== '') {
            onSendMessage(
                JSON.stringify({
                    sender: clientID,
                    body: messageInput
                })
            )
            setMessageInput('');
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageInput(event.target.value);
    }

    const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div>
            <input 
                type="text"
                value={messageInput}
                placeholder="Type a message..."
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress} 
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default ChatInput;