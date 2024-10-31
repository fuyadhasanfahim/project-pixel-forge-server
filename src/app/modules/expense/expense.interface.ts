export interface IAddExpenseHead {
    name: string
    creditType: string
    description: string
}

export interface ICreateExpense {
    expenseNumber: string
    credit: string
    date: string
    expenseHead: string
    reference: string
    amount: string
    notes: string
}
