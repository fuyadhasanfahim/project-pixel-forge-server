import ICustomerFormData from './customer.interface'
import { CustomerModel } from './customer.schema'

const createCustomerIntoDB = async (data: ICustomerFormData) => {
    try {
        const existingCustomer = await CustomerModel.findOne({
            $or: [
                { customerId: data.customerId },
                { customerEmail: data.customerEmail },
            ],
        })

        if (existingCustomer) {
            throw new Error('Customer already exists!')
        }

        const response = await CustomerModel.create(data)
        return response
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

const getCustomersFromDB = async () => {
    try {
        const customers = await CustomerModel.find()
        return customers
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

const getCustomerByCustomerIdFromDB = async (customerId: string) => {
    try {
        const customer = await CustomerModel.find({ customerId })
        return customer
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export const CustomerServices = {
    createCustomerIntoDB,
    getCustomersFromDB,
    getCustomerByCustomerIdFromDB,
}
