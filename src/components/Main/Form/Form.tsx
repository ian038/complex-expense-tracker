import React, { useState, useEffect } from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import CustomizedSnackbar from '../../Snackbar/CustomizedSnackbar';
import { TransactionProps } from '../../../types';
import { v4 as uuidv4 } from 'uuid';
import { useSpeechContext } from '@speechly/react-client';
import { useExpenseTracker } from '../../../context/context';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import { formatDate } from '../../../utils';

import useStyles from './styles'

const initialState: TransactionProps = {
    type: 'Income',
    category: '',
    amount: 0,
    date: formatDate(new Date().toDateString())
}

const Form: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const { segment } = useSpeechContext()
    const { addTransaction } = useExpenseTracker()
    const [formData, setFormData] = useState<TransactionProps>(initialState)
    const { type, category, amount, date } = formData
    const classes = useStyles()

    const createTransaction = () => {
        if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return
        const transaction = {
            ...formData,
            amount: Number(amount),
            id: uuidv4()
        }
        setOpen(true)
        addTransaction(transaction)
        setFormData(initialState)
    }

    useEffect(() => {
        if (segment) {
            if (segment.intent.intent === 'add_expense') {
                setFormData({ ...formData, type: 'Expense' })
            } else if (segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type: 'Income' })
            } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                return createTransaction
            } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                return setFormData(initialState)
            }
            segment.entities.forEach(e => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                switch (e.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: Number(e.value) })
                        break
                    case 'category':
                        if (incomeCategories.map(c => c.type).includes(category)) {
                            setFormData({ ...formData, category, type: 'Income' })
                        } else if (expenseCategories.map(c => c.type).includes(category)) {
                            setFormData({ ...formData, category, type: 'Expense' })
                        }
                        break
                    case 'date':
                        setFormData({ ...formData, date: e.value })
                        break
                    default:
                        break
                }
            })
            if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
                createTransaction()
            }
        }
    }, [segment])

    const selectedCategories = type === 'Income' ? incomeCategories : expenseCategories

    return (
        <Grid container spacing={2}>
            <CustomizedSnackbar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align='center' variant='subtitle2' gutterBottom>
                    {segment && segment.words.map(w => w.value).join(" ")}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={type} onChange={e => setFormData({ ...formData, type: (e.target.value as string) })}>
                        <MenuItem value='Income'>Income</MenuItem>
                        <MenuItem value='Expense'>Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={category} onChange={e => setFormData({ ...formData, category: (e.target.value as string) })}>
                        {selectedCategories.map(c => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type='number' label='Amount' fullWidth value={amount} onChange={(e: any) => setFormData({ ...formData, amount: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
                <TextField type='date' label='Date' fullWidth value={date} onChange={(e: any) => setFormData({ ...formData, date: (formatDate(e.target.value)) })} />
            </Grid>
            <Button className={classes.button} variant='outlined' color='primary' fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}

export default Form
