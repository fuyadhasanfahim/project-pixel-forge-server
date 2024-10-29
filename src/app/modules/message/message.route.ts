import { Router } from 'express'
import { MessageController } from './message.controller'

const router = Router()

router.post('/set-message', MessageController.setMessage)
router.get('/get-all-conversations', MessageController.getAllConversations)
router.get('/get-message/:conversationId', MessageController.getMessage)

export const MessageRouter = router
