import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppState } from '../../types';


const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      height: 400,
      maxHeight: 400,
      paddingTop: 40,
    },
    padding: {
        padding: 30,
    },
    stock: {
      color: "#00E041"
    },
  });
  
function ProductDetails() {
  const classes = useStyles();
  const displayProduct = useSelector( (state: AppState) => state.product.displayProduct)
    // const prod = displayProduct.filter( product => product._id === id)
  const [addToCartBtn, setAddToCartBtn] = useState(false)
//   console.log(id, "product clicked from catalog")

//   if(prod.quantity <= 0){
//     setAddToCartBtn(true)
//   }
    return (
        <>
        <div>
            inside product details
        </div>
        {/* <Card className={classes.root + classes.padding} key={prod._id}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={prod.name}
              image={prod.productImage}
              height="440"
              title="Picture here"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {prod.name}
              </Typography>
              
              <Typography variant="h6" component="h1">
               ${prod.price}
              </Typography>
              {prod.quantity > 0 ? <Typography variant="h6" component="h1" className={classes.stock}>
               In stock
              </Typography> : <Typography variant="h6" component="h1" className={classes.stock}>
               Out of stock
              </Typography>}
              
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" disabled={addToCartBtn} onClick={() => handleAddToCart(prod._id)} > 
                Add to Cart 
             </Button> 
          </CardActions>
        </Card> */}
        {/* <ConfirmDialog confirmDialog={confirmDialog} /> */}
      </>
      
      
      
    )
}

export default ProductDetails
