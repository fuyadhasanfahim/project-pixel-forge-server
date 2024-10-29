import { model } from 'mongoose'
import IOrders from './orders.interface'
import OrdersSchema from './orders.schema'

const OrdersModel = model<IOrders>('Order', OrdersSchema)
export default OrdersModel
