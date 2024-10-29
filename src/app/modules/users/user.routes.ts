import { Router } from 'express'
import { UserController } from './user.controller'

const router = Router()

router.post('/auth/create-user', UserController.createUser)
router.post('/auth/login', UserController.loginUser)
router.get('/auth/get-current-user', UserController.getCurrentUser)
router.get('/auth/get-user-by-id/:userId', UserController.getUserByUserID)
router.get('/auth/verify-email', UserController.verifyEmail)

export const UserRoutes = router
