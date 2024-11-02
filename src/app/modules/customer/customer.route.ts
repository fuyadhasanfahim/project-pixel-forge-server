import { Router } from 'express'
import { CustomerControllers } from './customer.controller'

const router = Router()

router.post('/create-customer', CustomerControllers.createCustomer)
router.get('/get-customers', CustomerControllers.getCustomers)
router.get('/get-customer/:customerId', CustomerControllers.getCustomer)

export const CustomerRoutes = router
