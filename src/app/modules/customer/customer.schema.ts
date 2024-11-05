import { model, Schema } from 'mongoose'
import ICustomerFormData from './customer.interface'

const CustomerSchema = new Schema<ICustomerFormData>({
    customerId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerAddress: { type: String, required: true },
})

export const CustomerModel = model<ICustomerFormData>(
    'Customer',
    CustomerSchema,
)
