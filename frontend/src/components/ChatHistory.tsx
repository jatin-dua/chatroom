import { twMerge } from "tailwind-merge";
import Message from "types";

interface ChatHistoryProps {
    messages: Message[];
    userID: string;
    className?: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, userID, className }) => {
    return (
        <div className={twMerge(`h-5/6`, className)}>
            <ul className="h-full overflow-auto mb-8">
                {messages.map((message) => (
                    <>
                    <li key={message.id} className="flex items-center gap-4 p-3 bg-neutral-900 rounded-3xl w-full">
                        <img className="w-12 h-12 rounded-full" src="./src/assets/naruto.png" />
                        <div className="flex flex-col items-start">
                            <strong className="text-amber-500 text-sm font-semibold dark:text-amber-500"> { userID === message.senderID ? message.sender + " (You)" : message.sender}</strong>
                            <span className="text-white text-base font-normal dark:text-slate-100 break-all">{message.body}</span>
                        </div>
                    </li>
                    </>
                ))}
            </ul>
        </div>
    )
}

export default ChatHistory;