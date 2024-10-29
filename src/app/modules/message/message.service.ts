import UserModel from '../users/user.model'
import { ConversationModel, MessageModel } from './message.schema'

const createMessageIntoDB = async ({
    senderId,
    receiverId,
    profileImage,
    message,
}: {
    senderId: string
    receiverId: string
    profileImage: string
    message: string
}) => {
    if (!senderId || !receiverId) {
        throw new Error('Both senderId and receiverId are required.')
    }

    const participants = [senderId, receiverId].sort().join('-')

    let conversation = await ConversationModel.findOne({ participants })

    if (!conversation) {
        const sender = await UserModel.findById(senderId).select(
            '_id username name email profileImage',
        )
        const receiver = await UserModel.findById(receiverId).select(
            '_id username name email profileImage',
        )

        conversation = new ConversationModel({
            participants,
            users: [sender, receiver],
            message: message,
        })

        await conversation.save()
    }

    const newMessage = new MessageModel({
        conversationId: conversation._id,
        senderId,
        receiverId,
        profileImage,
        message,
    })

    await newMessage.save()

    conversation.message = newMessage.message
    await conversation.save()

    return { message: newMessage, conversation }
}

const getAllConversationsFromDB = async () => {
    try {
        const conversations = await ConversationModel.find()

        return conversations
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

const getMessagesByConversationId = async (conversationId: string) => {
    try {
        if (!conversationId) {
            throw new Error('Conversation ID is required')
        }

        const messages = await MessageModel.find({ conversationId })
            .populate('senderId', 'username name email')
            .populate('receiverId', 'username name email')

        return messages
    } catch (error) {
        throw new Error(`Error fetching messages: ${(error as Error).message}`)
    }
}

export const messageServices = {
    createMessageIntoDB,
    getAllConversationsFromDB,
    getMessagesByConversationId,
}
