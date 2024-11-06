import { RequestHandler, Express } from 'express'
import { OrdersServices } from './orders.services'
import httpStatus from 'http-status'
import moment from 'moment'

const uploadFiles: RequestHandler = async (req, res) => {
    const { username } = req.body
    const files = req.files as Express.Multer.File[]

    if (!username || !files?.length) {
        res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Username and files are required for upload.',
        })
    }

    try {
        const timestampFolder = moment().format('DD-MM-YYYY/HH')
        const folderUrl = `https://console.cloudinary.com/console/c-e325ade2a2814f45f2f14be14f2f9d/media_library/folders/${username}/${timestampFolder}?view_mode=mosaic`

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Files uploaded successfully',
            folderUrl,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const createOrders: RequestHandler = async (req, res) => {
    try {
        const orders = req.body

        const createdOrder = await OrdersServices.createOrdersIntoDB(orders)

        res.status(httpStatus.CREATED).json({
            success: true,
            message: 'Order created successfully',
            order: createdOrder,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const getOrders: RequestHandler = async (req, res) => {
    try {
        const { userId } = req.params

        const orders = await OrdersServices.getOrderByUserIdFromDB(userId)

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Orders retrieved successfully',
            orders,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const getOrderByOrderId: RequestHandler = async (req, res) => {
    try {
        const { orderId } = req.params

        const order = await OrdersServices.getOrderByOrderIdFromDB(orderId)

        if (!order) {
            throw new Error(`Order ${orderId} not found!`)
        }

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Order retrieved successfully',
            order,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const getAllOrders: RequestHandler = async (req, res) => {
    try {
        const orders = await OrdersServices.getAllOrdersFromDB()

        if (!orders || orders.length === 0) {
            throw new Error('Order not found.')
        }

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Orders are retrieved successfully',
            orders,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const updateOrderById: RequestHandler = async (req, res) => {
    try {
        const { orderId } = req.params
        const updateData = req.body

        if (!orderId) {
            res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'Order ID is required',
            })
        }

        const updatedOrder = await OrdersServices.updateOrderByIdIntoDB(
            orderId,
            updateData,
        )

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Order updated successfully',
            order: updatedOrder,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const getAllOrderByCustomerId: RequestHandler = async (req, res) => {
    const { customerId } = req.params

    if (!customerId) {
        res.status(400).json({
            success: false,
            message: 'Customer ID is required',
        })
    }

    try {
        const orders =
            await OrdersServices.getOrdersByCustomerIdFromDB(customerId)

        if (!orders || orders.length === 0) {
            throw new Error('Order not found.')
        }

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Orders are retrieved successfully',
            orders,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

export const OrdersController = {
    uploadFiles,
    createOrders,
    getOrders,
    getOrderByOrderId,
    getAllOrders,
    updateOrderById,
    getAllOrderByCustomerId,
}
