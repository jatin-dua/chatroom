interface ChatHistoryProps {
    messages: string[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
    return (
        <div>
            <h2>Chat History</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}> {message} </li>
                ))}
            </ul>
        </div>
    )
}

export default ChatHistory;