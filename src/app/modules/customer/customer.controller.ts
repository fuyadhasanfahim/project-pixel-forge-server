import { RequestHandler } from 'express'
import { CustomerServices } from './customer.service'
import httpStatus from 'http-status'

const createCustomer: RequestHandler = async (req, res) => {
    const { data } = req.body

    try {
        if (!data) {
            res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'No customer data provided',
            })
        }

        const customer = await CustomerServices.createCustomerIntoDB(data)

        res.status(httpStatus.CREATED).json({
            success: true,
            message: 'Customer created successfully',
            customer,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const getCustomers: RequestHandler = async (req, res) => {
    try {
        const customers = await CustomerServices.getCustomersFromDB()
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Customers retrieved successfully',
            customers,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const getCustomer: RequestHandler = async (req, res) => {
    const { customerId } = req.params

    if (!customerId) {
        res.status(400).json({
            success: false,
            message: 'Customer ID is required',
        })
    }

    try {
        const customer =
            await CustomerServices.getCustomerByCustomerIdFromDB(customerId)

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Customers retrieved successfully',
            customer,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

export const CustomerControllers = {
    createCustomer,
    getCustomers,
    getCustomer,
}
