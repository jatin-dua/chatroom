import { twMerge } from "tailwind-merge";

interface ChatProps {
    children: React.ReactNode;
    className?: string;
}

const Chat: React.FC<ChatProps> = ({ children, className}) => {
    return (
        <div className={twMerge(`
        flex-col
        h-full
        w-full
        p-2
        bg-neutral-900
        rounded-lg
        `, className)}>
            {children}
        </div>
    )
}

export default Chat;