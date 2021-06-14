import { Backdrop, Box, Button, Card, CardContent, CircularProgress, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, fetchCart } from '../../redux/actions';
import { AppState } from '../../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 400,
      padding: 20,
    },
    media: {
      width: 300,
    },
    card: {
        margin: 10,
    },
    textColor: {
        color: '#f44336',
    },
    button: {
        backgroundColor: "orange",
        margin: 40,
    },
    spacing: {
        marginTop: 40,
    },
    backdrop: {
        zIndex: 10,
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.1)'
      },
  }),
);



function Cart() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const inCart  = useSelector( (state: AppState) => state.cart.inCart )
    // const [isOpen, setIsOpen] = useState(false);

    const handleAddToCart = (productId: string, userId: string) => {
        // setIsOpen(true)
        dispatch(addItemToCart({
            purchasedBy: userId,
            items: [{
                productId: productId,
                quantity: 1
            }]
        })
        )
        dispatch(fetchCart(userId))

        window.location.reload()
    }

    const handleRemoveFromCart = (productId: string, userId: string) => {
        // setIsOpen(true)
        dispatch(addItemToCart({
            purchasedBy: userId,
            items: [{
                productId: productId,
                quantity: -1
            }]
        })
        )
        dispatch(fetchCart(userId))
        window.location.reload()
    }

    // const handleClose = () => {
    //     setIsOpen(false)
    //   }

    return (
        <>
            <Box className={classes.root} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <Typography className={classes.textColor} variant="h4" component="h4">You're Items</Typography>
                { inCart ? inCart.items?.map( item => {
                    return (
                        <Card className={classes.card}>
                            <img className={classes.media} src={item.productId.productImage} alt={item.productId.name} />
                            <CardContent>
                                <Typography>{item.productId.name}</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <Button onClick={() => handleRemoveFromCart(item.productId._id!, inCart.purchasedBy)} >
                                    -
                                    </Button>
                                    <Typography>{item.quantity}</Typography>
                                    <Button onClick={() => handleAddToCart(item.productId._id!, inCart.purchasedBy)}>
                                    +
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    )
                }) : "Cart is empty" }
                <Typography className={classes.spacing} variant="h5" component="h5" ><b>Total Amount:</b> $ {inCart ? Math.round(inCart.totalAmount * 100)/100 : 0}</Typography>
                <Button variant="contained" className={classes.button}>Proceed to Payment</Button>
            </Box>
        {/* <Backdrop className={classes.backdrop} open={isOpen} onClick={() => handleClose()}>
            <CircularProgress color="inherit" />
        </Backdrop> */}
        </>
    )
}

export default Cart
