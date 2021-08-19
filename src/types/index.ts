import React from "react"

export type DetailsProp = {
    title: string
}

export type TransactionProps = {
    id?: string
    type: string
    category: string
    amount: number
    date: string
}

export type CustomizedSnackbarProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}