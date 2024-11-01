import { Router } from 'express'
import { CustomerControllers } from './customer.controller'

const router = Router()

router.post('/create-customer', CustomerControllers.createCustomer)
router.get('/get-customers', CustomerControllers.getCustomers)

export const CustomerRoutes = router
