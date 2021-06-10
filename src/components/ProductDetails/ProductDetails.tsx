import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItemToCart } from '../../redux/actions';
import { AppState } from '../../types';


const useStyles = makeStyles({
    root: {
      maxWidth: 200,
      paddingTop: 40,
    },
    media: {
        height: 700,
        objectFit: 'cover',
    },
    padding: {
        padding: 30,
    },
    stock: {
      color: "#00E041"
    },
  });

  type ParamTypes = {
    id: string
  }
function ProductDetails() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { id } = useParams<ParamTypes>()
  const displayProduct = useSelector( (state: AppState) => state.product.displayProduct)
  const userId = useSelector( (state: AppState) => state.user.userId)
  const [prod] = displayProduct.filter( product => product._id === id)
  const [addToCartBtn, setAddToCartBtn] = useState(false)

  if(prod.quantity <= 0){
    setAddToCartBtn(true)
  }

const handleAddToCart = (prodId: string) => {
    dispatch(addItemToCart({
      purchasedBy: userId,
      items: [{
        productId: prodId,
        quantity: 1
      }]
    }))
}
    return (
        <>
        {/* <div>
            inside product details
        </div> */}
        <Card className={classes.root + classes.padding} key={prod._id}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              component="img"
              alt={prod.name!}
              image={prod.productImage!}
              title="Picture here"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {prod.name!}
              </Typography>
              
              <Typography variant="h6" component="h1">
               ${prod.price!}
              </Typography>
              {prod.quantity > 0 ? <Typography variant="h6" component="h1" className={classes.stock}>
               In stock
              </Typography> : <Typography variant="h6" component="h1" className={classes.stock}>
               Out of stock
              </Typography>}
              <Typography>
                  {prod.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" disabled={addToCartBtn}  onClick={() => handleAddToCart(prod._id!) }> 
                Add to Cart 
             </Button> 
          </CardActions>
        </Card>
        {/* <ConfirmDialog confirmDialog={confirmDialog} /> */}
      </>
      
      
      
    )
}

export default ProductDetails
