interface IUser {
    userId: string
    username: string
    name: string
    email: string
    profileImage: string
}

interface IMessage {
    conversationId: string
    senderId: string
    receiverId: string
    message: string
}

interface IConversation {
    participants: string
    users: IUser[]
    message: string
}

export { IUser, IConversation, IMessage }
