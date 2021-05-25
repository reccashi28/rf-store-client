import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react'

function Notification(props: any) {

const {notify, setNotify } = props;

const handleClose = (event: React.SyntheticEvent, reason: string) => {
    if (reason === 'clickaway') {
        return;
    }
    setNotify({
        ...notify,
        isOpen: false
    })
}
    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={2000}
            anchorOrigin= { { vertical: 'top', horizontal: 'right'}}
            onClose={handleClose}
        >
            <Alert 
                severity={notify.type}            
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification
