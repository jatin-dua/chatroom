interface Message {
    id: number;
    type: number;
    senderID: string
    sender: string;
    body: string;
}

export default Message;