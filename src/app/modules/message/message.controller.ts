import { RequestHandler } from 'express'
import { messageServices } from './message.service'
import httpStatus from 'http-status'

const setMessage: RequestHandler = async (req, res) => {
    try {
        const { senderId, receiverId, profileImage, message } = req.body
        const result = await messageServices.createMessageIntoDB({
            senderId,
            receiverId,
            profileImage,
            message,
        })

        res.status(201).json({ success: true, data: result })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const getAllConversations: RequestHandler = async (req, res) => {
    try {
        const conversations = await messageServices.getAllConversationsFromDB()

        if (!conversations) {
            res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'No conversations found',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Conversations fetched successfully',
            conversations,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const getMessage: RequestHandler = async (req, res) => {
    try {
        const { conversationId } = req.params

        if (!conversationId) {
            res.status(400).json({
                success: false,
                message: 'Conversation ID is required',
            })
        }

        const messages =
            await messageServices.getMessagesByConversationId(conversationId)

        res.status(200).json({
            success: true,
            messages,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message,
        })
    }
}

export const MessageController = {
    setMessage,
    getAllConversations,
    getMessage,
}
