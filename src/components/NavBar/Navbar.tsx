import { Box, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppState } from '../../types'
// import AddNewProduct from '../AddNewProduct/AddNewProduct'

const useStyles = makeStyles((theme) => ({
    nav: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",

    },
    nav_item: {
        listStyle: "none",
        padding: 16,
    },
    nav_link: {
        textDecoration: "none",
        color: "black",
        fontSize: 20
    }

  }));

function Navbar() {
  const classes = useStyles();
    const { role } = useSelector( (state: AppState) => state.user)
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            { role === "admin"  ?
            (
                <Grid container>
                    <Grid item>
                        <ul className={classes.nav}>
                            <li className={classes.nav_item}><Link className={classes.nav_link} to="/dashboard">Dashboard</Link></li>
                            <li className={classes.nav_item}> <Link className={classes.nav_link} to='/product'>Product</Link></li>
                            <li className={classes.nav_item}> <Link className={classes.nav_link} to='/addProduct'>Add New Product</Link></li>
                        </ul>
                    </Grid>
                </Grid>
                ) 
                :
                (
                <Grid container>
                    <Grid item>
                    <ul className={classes.nav}>
                        <li className={classes.nav_item}><Link className={classes.nav_link} to="/">Home</Link></li>
                        <li className={classes.nav_item}><Link className={classes.nav_link} to="/product">Product</Link></li>
                    </ul>
                    </Grid>
                </Grid>
            )
            
        }
        </Box>

    )
}

export default Navbar
