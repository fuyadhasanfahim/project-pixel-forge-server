import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import { ExpenseServices } from './expense.service'

const createExpenseHead: RequestHandler = async (req, res) => {
    try {
        const { name, creditType, description } = req.body

        if (!name || !creditType || !description) {
            res.status(400).json({
                success: false,
                message: 'Every input is required.',
            })
        }

        const expense = await ExpenseServices.CreateExpenseHeadIntoDB({
            name,
            creditType,
            description,
        })

        res.status(httpStatus.CREATED).json({
            success: true,
            message: 'Expense created successfully.',
            expense,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const getExpenseHead: RequestHandler = async (req, res) => {
    try {
        const expenses = await ExpenseServices.getExpenseHeaderFromDB()

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Expenses fetched successfully.',
            expenses,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const createExpense: RequestHandler = async (req, res) => {
    try {
        const {
            credit,
            date,
            expenseHead,
            reference,
            amount,
            notes,
            expenseNumber,
        } = req.body

        if (
            !credit ||
            !date ||
            !amount ||
            !notes ||
            !expenseHead ||
            !reference ||
            !expenseNumber
        ) {
            res.status(400).json({
                success: false,
                message: 'Every input is required.',
            })
        }

        const expense = await ExpenseServices.CreateExpenseIntoDB({
            expenseNumber,
            credit,
            date,
            expenseHead,
            reference,
            amount,
            notes,
        })

        res.status(httpStatus.CREATED).json({
            success: true,
            message: 'Expense created successfully.',
            expense,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const getExpenses: RequestHandler = async (req, res) => {
    try {
        const expenses = await ExpenseServices.getExpenseFromDB()

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Expenses fetched successfully.',
            expenses,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const deleteExpense: RequestHandler = async (req, res) => {
    const { expenseNumber } = req.params

    try {
        if (!expenseNumber) {
            res.status(400).json({
                success: false,
                message: 'Expense number not found.',
            })
        }

        await ExpenseServices.deleteExpenseFromDB(expenseNumber)

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Expense deleted successfully.',
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const updateExpense: RequestHandler = async (req, res) => {
    const { expenseId } = req.params
    const { data } = req.body

    try {
        if (!expenseId || !data) {
            res.status(400).json({
                success: false,
                message: 'Expense ID or data not found.',
            })
        }

        const updatedExpense = await ExpenseServices.updateExpenseFromDB({
            expenseId,
            data,
        })

        if (!updatedExpense) {
            res.status(404).json({
                success: false,
                message: 'Expense not found.',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Expense updated successfully.',
            data: updatedExpense,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

export const ExpenseControllers = {
    createExpenseHead,
    getExpenseHead,
    createExpense,
    getExpenses,
    deleteExpense,
    updateExpense,
}
