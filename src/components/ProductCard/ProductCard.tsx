import React, {  useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Backdrop, CircularProgress, Grid } from '@material-ui/core';

import { AppState, Product } from '../../types';
import { addItemToCart, deleteProduct, fetchCart, fetchPending, fetchPendingItems } from '../../redux/actions';
// import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

type ProductCardProps = {
    prod: Product
}

const useStyles = makeStyles({
  root: {
    width: 345,
    paddingTop: 40,
  },
  padding: {
      padding: 30,
  },
  stock: {
    color: "#00E041"
  },
  backdrop: {
    zIndex: 10,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
});

function ProductCard( {prod}: ProductCardProps) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()
  const { role, userId } = useSelector( (state: AppState) => state.user)
  // const pending = useSelector( (state: AppState) => state.cart.pending)
  // const items = useSelector( (state: AppState) => state.cart.inCart)
  const [addToCartBtn, setAddToCartBtn] = useState(false)
  // const [isOpen, setIsOpen] = useState(false);
  // const [addToCartData, setAddToCartData] = useState<ItemToCart>()

  //disabling add to cart button if product is not in stock
  if(prod.quantity <= 0){
    setAddToCartBtn(true)
  }

  // const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
  const handelDelete = (id: string) => {
    if(window.confirm('Are you sure you want to delete this product?')){
      dispatch(deleteProduct(id, history))
    }
  }
  const handleAddToCart = (prodId: string) => {
    // setIsOpen(true)
      dispatch(addItemToCart({
        purchasedBy: userId,
        items: [{
          productId: prodId,
          quantity: 1
        }]
      }))
      dispatch(fetchPendingItems())
      // window.location.reload()
    // setTimeout(() => {
    //   setIsOpen(false)
    // }, 1000);
  }

  const handleClose = () => {
    dispatch(fetchCart(userId))
    // setIsOpen(false)
  }

return (
<>
  <Card className={classes.root + classes.padding} key={prod._id}>
    <CardActionArea>
    <Link to={`/productdetails/${prod._id}`}>
      <CardMedia
        component="img"
        alt={prod.name}
        image={prod.productImage}
        height="440"
        title="Picture here"
      />
      </Link>
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
      { role === "admin" ? ( <Grid container> <Link to={`/editProduct/${prod._id}`}>
        <Button size="small" color="primary"> 
          Edit
        </Button>
        </Link>
        <Button size="small" color="primary" onClick={ ()=> prod._id && (handelDelete(prod._id))}>
          Delete
        </Button>
        </Grid>
        ) :
       (<Button size="small" color="primary" disabled={addToCartBtn} onClick={() => {
         if(prod._id){
          handleAddToCart(prod._id)
         }
       }} > Add to Cart </Button> )        
      }
    </CardActions>
  </Card>
  {/* <ConfirmDialog confirmDialog={confirmDialog} /> */}
  {/* <Backdrop className={classes.backdrop} open={isOpen} onClick={() => handleClose()}>
            <CircularProgress color="inherit" />
  </Backdrop> */}

</>
  );


}

export default React.memo(ProductCard)
