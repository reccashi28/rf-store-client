import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import ProductCard from '../../components/ProductCard/ProductCard';

import { fetchProduct } from '../../redux/actions';
import { AppState, Product } from '../../types';
import { Grid, makeStyles } from '@material-ui/core';



function ProductCatalog() {
    const dispatch = useDispatch();
    const { displayProduct } = useSelector( (state: AppState) => state.product)
    console.log(displayProduct, "from all products component")
    
    const useStyles = makeStyles({
        root: {
          paddingTop: 40,
        },
      });
      
        const classes = useStyles();

    useEffect( () => {
        dispatch(fetchProduct())
    }, [dispatch])

    return (
        <Grid container className={classes.root}>

            <Grid item sm={12}>
                <Grid item container spacing={2} justify="center" alignContent="center">
                    {displayProduct ? displayProduct.map( prod => <Grid item xs={10} sm={4}><ProductCard prod={prod} key={prod._id}/> </Grid>): <CircularProgress />
                }
                </Grid>
            </Grid>
        </Grid>

    )
}

export default ProductCatalog;