import { Router } from 'express'
import { OrdersController } from './orders.controller'
import { upload } from '../../middlewares/cloudinary'

const router = Router()

router.post(
    '/upload-files',
    upload.array('images'),
    OrdersController.uploadFiles,
)
router.post('/create-order', OrdersController.createOrders)
router.get('/get-order/:userId', OrdersController.getOrders)
router.get(
    '/get-order-by-order-id/:orderId',
    OrdersController.getOrderByOrderId,
)
router.get('/get-all-orders', OrdersController.getAllOrders)
router.put('/update-order/:orderId', OrdersController.updateOrderById)

export const OrdersRoutes = router
