import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AppState, Product } from '../../types';
import { Link, useHistory } from 'react-router-dom';
import { CircularProgress, Grid } from '@material-ui/core';
import { deleteProduct, fetchProduct } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

type ProductCardProps = {
    prod: Product
}

function ProductCard( {prod}: ProductCardProps) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { role } = useSelector( (state: AppState) => state.user)
  const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 400,
    maxHeight: 400,
    paddingTop: 40,
  },
  padding: {
      padding: 30,
  }
});

  const classes = useStyles();
  // const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
  
  const handelDelete = (id: string) => {
    if(window.confirm('Are you sure you want to delete this product?')){
      dispatch(deleteProduct(id, history))
    }
  }
  return (
<>
  <Card className={classes.root + classes.padding} key={prod._id}>
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
      </CardContent>
    </CardActionArea>
    <CardActions>
      { role === "user" ? 
       (<Button size="small" color="primary" > Add to Cart </Button> ) : 
        ( <Grid container> <Link to={`/editProduct/${prod._id}`}>
        <Button size="small" color="primary"> 
          Edit
        </Button>
        </Link>
        <Button size="small" color="primary" onClick={ ()=> {
          // setConfirmDialog({
          //   isOpen: true,
          //   title: 'Are you sure to delete this item?',
          //   subTitle: 'You can\'t undo this operation'
          // })
          prod._id && (handelDelete(prod._id)
          
          )}
        }>
          Delete
        </Button>
        </Grid>
        )
        }
      
     
    </CardActions>
  </Card>
  {/* <ConfirmDialog confirmDialog={confirmDialog} /> */}
</>
  );


}

export default ProductCard
