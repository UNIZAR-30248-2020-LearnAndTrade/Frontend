export interface chatMessage {
    id: string;
    chatId: string;
    senderId: string;
    recipientId: string;
    senderName: string;
    recipientName: string;
    content: string;
    timestamp: Date;
    MessageStatus: string;
}