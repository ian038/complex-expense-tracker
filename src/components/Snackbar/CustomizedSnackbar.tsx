import React from 'react'
import { Snackbar } from '@material-ui/core'
import { CustomizedSnackbarProps } from '../../types'
import Alert from '@material-ui/lab/Alert'

import useStyles from './styles'

const CustomizedSnackbar: React.FC<CustomizedSnackbarProps> = ({ open, setOpen }) => {
    const classes = useStyles()

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity='success' elevation={6} variant='filled'>
                    Transaction successfully created!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default CustomizedSnackbar