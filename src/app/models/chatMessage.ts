export interface chatMessage {
    senderId: string;
    recipientId: string;
    senderName: string;
    recipientName: string;
    content: string;
    timestamp: Date;
}
