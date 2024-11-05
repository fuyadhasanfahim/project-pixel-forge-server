import { Router } from 'express'
import { ExpenseControllers } from './expense.controller'

const router = Router()

router.post('/create-expense-head', ExpenseControllers.createExpenseHead)
router.get('/get-expense-head', ExpenseControllers.getExpenseHead)
router.post('/create-expense', ExpenseControllers.createExpense)
router.get('/get-expenses', ExpenseControllers.getExpenses)
router.delete('/delete-expense/:expenseNumber', ExpenseControllers.getExpenses)
router.patch('/update-expense/:expenseId', ExpenseControllers.updateExpense)

export const ExpenseRouter = router
