import { useReducer, createContext, useContext } from 'react'
import { TransactionProps } from '../types'

const initialState: TransactionProps[] = JSON.parse(localStorage.getItem('transactions')) || [{
    "type": "Income", "category": "Extra income", "amount": 45, "date": "2021-08-19", "id": "6f4bd1cd-0d05-498a-aa16-01d7deaef0fb"
}, { "type": "Expense", "category": "Entertainment", "amount": 25, "date": "2021-08-21", "id": "ffa99534-2436-465c-8327-a054e6af411d" }, { "type": "Expense", "category": "Clothes", "amount": 30, "date": "2021-08-25", "id": "557d900d-4c6b-4bf4-a981-813ed185f67f" }, {
    "type": "Income", "category": "Business", "amount": 100, "date": "2021-08-24", "id": "676995cd-1de7-4eb1-9612-30e786541474"
}]

export const ExpenseTrackerContext = createContext<any>({})

enum TransactionActionKind {
    DELETE_TRANSACTION = 'DELETE_TRANSACTION',
    ADD_TRANSACTION = 'ADD_TRANSACTION'
}

type TransactionAction = {
    type: TransactionActionKind
    payload: string | TransactionProps
}

const contextReducer = (state: Array<TransactionProps>, action: TransactionAction) => {
    let transactions
    const { type, payload } = action
    switch (type) {
        case TransactionActionKind.DELETE_TRANSACTION:
            transactions = state.filter(t => t.id !== payload)
            localStorage.setItem('transactions', JSON.stringify(transactions))
            return transactions
        case TransactionActionKind.ADD_TRANSACTION:
            transactions = [payload, ...state]
            localStorage.setItem('transactions', JSON.stringify(transactions))
            return transactions
        default:
            return state
    }
}

function useProvideExpenseTracker() {
    const [transactions, dispatch] = useReducer(contextReducer, initialState)

    const deleteTransaction = (id: string) => {
        dispatch({ type: TransactionActionKind.DELETE_TRANSACTION, payload: id });
    };

    const addTransaction = (transaction: any) => {
        dispatch({ type: TransactionActionKind.ADD_TRANSACTION, payload: transaction });
    };

    const balance = transactions.reduce((acc, currVal) => currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount, 0)

    return {
        deleteTransaction,
        addTransaction,
        transactions,
        balance
    }
}

export const ExpenseTrackerProvider = ({ children }: any) => {
    const expenseTracker = useProvideExpenseTracker()
    return <ExpenseTrackerContext.Provider value={expenseTracker}>{children}</ExpenseTrackerContext.Provider>
}

export const useExpenseTracker = () => useContext(ExpenseTrackerContext)

