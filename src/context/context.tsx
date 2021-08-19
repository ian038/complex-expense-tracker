import React, { useReducer, createContext, useContext } from 'react'
import { TransactionProps } from '../types'

const initialState: any[] = []

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
            return transactions
        case TransactionActionKind.ADD_TRANSACTION:
            transactions = [payload, ...state]
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

    return {
        deleteTransaction,
        addTransaction,
        transactions
    }
}

export const ExpenseTrackerProvider = ({ children }: any) => {
    const expenseTracker = useProvideExpenseTracker()
    return <ExpenseTrackerContext.Provider value={expenseTracker}>{children}</ExpenseTrackerContext.Provider>
}

export const useExpenseTracker = () => useContext(ExpenseTrackerContext)

