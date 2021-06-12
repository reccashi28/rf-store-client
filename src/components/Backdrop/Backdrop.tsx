import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';

import { fetchCart } from '../../redux/actions';
import { AppState } from '../../types';


const useStyles = makeStyles({
    backdrop: {
        zIndex: 10,
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
});

function Backdrop(props: any) {
    const classes = useStyles();
    const dispatch = useDispatch()
  const { userId } = useSelector( (state: AppState) => state.user)
    const { isOpen, setIsOpen} = props;

    const handleClose = () => {
        dispatch(fetchCart(userId))
        setIsOpen(false)
      }
    return (
        <Backdrop className={classes.backdrop} open={isOpen} onClick={() => handleClose()}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Backdrop
