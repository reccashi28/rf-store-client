import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import ProductCard from '../../components/ProductCard/ProductCard';

import { fetchProduct } from '../../redux/actions';
import { AppState } from '../../types';
import { Grid, makeStyles } from '@material-ui/core';
// import { Link } from 'react-router-dom';



function ProductCatalog() {
    const dispatch = useDispatch();
    const { displayProduct, searchProduct } = useSelector( (state: AppState) => state.product)
    
    const product = displayProduct.filter( product => {
        return product.name.toLocaleLowerCase().includes(searchProduct.toLocaleLowerCase())
    })
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
                    {product ? product.map( prod => <Grid item sm={10} md={10} lg={4}>< ProductCard prod={prod} key={prod._id}/> </Grid>): <CircularProgress />
                }
                </Grid>
            </Grid>
        </Grid>

    )
}

export default ProductCatalog;