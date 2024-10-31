import { model } from 'mongoose'
import { AddExpenseHeadSchema, CreateExpenseSchema } from './expense.schema'
import { IAddExpenseHead, ICreateExpense } from './expense.interface'

export const AddExpenseHeadModel = model<IAddExpenseHead>(
    'AddExpenseHead',
    AddExpenseHeadSchema,
)

export const CreateExpenseModel = model<ICreateExpense>(
    'CreateExpense',
    CreateExpenseSchema,
)
