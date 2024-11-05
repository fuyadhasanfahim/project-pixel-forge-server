import { IAddExpenseHead, ICreateExpense } from './expense.interface'
import { AddExpenseHeadModel, CreateExpenseModel } from './expense.model'

const CreateExpenseHeadIntoDB = async ({
    name,
    creditType,
    description,
}: IAddExpenseHead) => {
    try {
        const response = await AddExpenseHeadModel.create({
            name,
            creditType,
            description,
        })

        return response
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

const getExpenseHeaderFromDB = async () => {
    try {
        const response = await AddExpenseHeadModel.find()

        return response
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

const CreateExpenseIntoDB = async ({
    expenseNumber,
    credit,
    date,
    expenseHead,
    reference,
    amount,
    notes,
}: ICreateExpense) => {
    try {
        const response = await CreateExpenseModel.create({
            expenseNumber,
            credit,
            date,
            expenseHead,
            reference,
            amount,
            notes,
        })

        return response
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

const getExpenseFromDB = async () => {
    try {
        const response = await CreateExpenseModel.find()

        return response
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

const deleteExpenseFromDB = async (expenseNumber: string) => {
    try {
        const response = await CreateExpenseModel.deleteOne({
            expenseNumber,
        })

        return response
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

const updateExpenseFromDB = async ({
    expenseId,
    data,
}: {
    expenseId: string
    data: Partial<ICreateExpense>
}) => {
    try {
        const response = await CreateExpenseModel.findByIdAndUpdate(
            expenseId,
            data,
            { new: true },
        )

        return response
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export const ExpenseServices = {
    CreateExpenseHeadIntoDB,
    getExpenseHeaderFromDB,
    CreateExpenseIntoDB,
    getExpenseFromDB,
    deleteExpenseFromDB,
    updateExpenseFromDB,
}
