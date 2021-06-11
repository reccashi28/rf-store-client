import { Box, Button, Card, CardContent, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart } from '../../redux/actions';
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
    }
  }),
);



function Cart() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const inCart  = useSelector( (state: AppState) => state.cart.inCart )

    const handleAddToCart = (productId: string, userId: string) => {

        dispatch(addItemToCart({
            purchasedBy: userId,
            items: [{
                productId: productId,
                quantity: 1
            }]
        })
        )
    }

    const handleRemoveFromCart = (productId: string, userId: string) => {
        dispatch(addItemToCart({
            purchasedBy: userId,
            items: [{
                productId: productId,
                quantity: -1
            }]
        })
        )
    }
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
        </>
    )
}

export default Cart
