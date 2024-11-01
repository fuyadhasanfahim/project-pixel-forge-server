import { Router } from 'express'
import { UserRoutes } from '../modules/users/user.routes'
import { OrdersRoutes } from '../modules/orders/orders.routes'
import { MessageRouter } from '../modules/message/message.route'
import { ExpenseRouter } from '../modules/expense/expense.routes'
import { CustomerRoutes } from '../modules/customer/customer.route'

const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/orders',
        route: OrdersRoutes,
    },
    {
        path: '/messages',
        route: MessageRouter,
    },
    {
        path: '/expenses',
        route: ExpenseRouter,
    },
    {
        path: '/customers',
        route: CustomerRoutes,
    },
]

moduleRoutes.forEach((moduleRoute) => {
    const { path, route } = moduleRoute

    return router.use(path, route)
})

export default router
