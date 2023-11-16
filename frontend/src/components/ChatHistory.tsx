import Message from "types";

interface ChatHistoryProps {
    messages: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
    return (
        <div>
            <h2>Chat History</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}> {`<user ${message.sender}>    ${message.body}`} </li>
                ))}
            </ul>
        </div>
    )
}

export default ChatHistory;