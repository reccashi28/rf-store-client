import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import React from 'react'

type confirmDialogProps = {
    isOpen: boolean
    title: string
    subTitle: string
}

function ConfirmDialog(props: confirmDialogProps) {

    // const { confirmDialog} = props

    return (
    //    <Dialog open={confirmDialog.isOpen}>
    //        <DialogTitle>

    //        </DialogTitle>
    //        <DialogContent>
    // <Typography variant="h6">{confirmDialog.title}</Typography>
    // <Typography variant="h6">{confirmDialog.subTitle}</Typography>
    //        </DialogContent>
    //        <DialogActions>
    //             <Button variant="contained">Yes</Button>
    //             <Button variant="contained">No</Button>
    //        </DialogActions>
    //     </Dialog>
    <> im dialogue</>
    )
}

export default ConfirmDialog
