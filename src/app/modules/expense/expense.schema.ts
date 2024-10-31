import { Schema } from 'mongoose'
import { IAddExpenseHead, ICreateExpense } from './expense.interface'

export const AddExpenseHeadSchema = new Schema<IAddExpenseHead>(
    {
        name: { type: String, required: true },
        creditType: { type: String, required: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true,
    },
)

export const CreateExpenseSchema = new Schema<ICreateExpense>(
    {
        expenseNumber: { type: String, required: true },
        credit: { type: String, required: true },
        date: { type: String, required: true },
        expenseHead: { type: String, required: true },
        reference: { type: String, required: true },
        amount: { type: String, required: true },
        notes: { type: String, required: true },
    },
    {
        timestamps: true,
    },
)
