import { model, Schema } from 'mongoose'

const messageSchema = new Schema(
    {
        conversationId: {
            type: String,
            ref: 'Conversation',
            required: true,
        },
        senderId: {
            type: String,
            ref: 'User',
            required: true,
        },
        receiverId: {
            type: String,
            ref: 'User',
            required: true,
        },
        message: { type: String, required: true },
    },
    { timestamps: true },
)

const conversationSchema = new Schema(
    {
        participants: {
            type: String,
            ref: 'User',
            required: true,
        },
        users: { type: [Object], required: true },
        message: { type: String, default: '' },
    },
    { timestamps: true },
)

const MessageModel = model('Message', messageSchema)
const ConversationModel = model('Conversation', conversationSchema)

export { MessageModel, ConversationModel }
