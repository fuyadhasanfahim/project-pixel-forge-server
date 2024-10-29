import { Schema } from 'mongoose'
import IOrders from './orders.interface'

const OrdersSchema = new Schema<IOrders>(
    {
        userId: {
            type: String,
            ref: 'User',
            required: true,
        },
        username: {
            type: String,
            ref: 'User',
            required: true,
        },
        services: {
            type: [String],
            required: true,
        },
        complexities: {
            type: Map,
            of: String,
            required: true,
        },
        additionalInstructions: {
            type: String,
            required: false,
        },
        outputFormat: {
            type: String,
            enum: ['JPEG', 'PNG', 'TIFF', 'PSD', 'GIF', 'RAW', 'SVG', 'WEBP'],
            required: true,
        },
        deliveryDate: { type: String, required: true },
        status: {
            type: String,
            enum: [
                'pending',
                'inprogress',
                'delivered',
                'completed',
                'revision',
                'canceled',
                'request for additional information',
            ],
            default: 'pending',
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid'],
            default: 'pending',
            required: true,
        },
        folderUrl: {
            type: String,
            required: true,
        },
        images: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
)

export default OrdersSchema
