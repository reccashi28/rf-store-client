import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Badge, Box, Button, CircularProgress, Drawer, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

import { userLogout } from '../../redux/actions/user'
import { AppState } from '../../types'
import Navbar from '../NavBar/Navbar'
import useUser from '../../hooks/useUser'
import Cart from '../Cart/Cart';
import Searchbar from '../Searchbar/Searchbar';

import fbIcon from '../../assets/images/fb-icon.png'
import instaIcon from '../../assets/images/instagram-icon.png'
import liIcon from '../../assets/images/linkedin-icon.png'


const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#f0ede6",
        padding: 20,
        borderRadius: 5,
    },
    images: {
        width: '30px',
    },
    socialMediaContainer: {
        display: "flex",
        alignItems: "center",
    },
    listItem: {
        padding: theme.spacing(0, 2, 0, 0),
        listStyleType: 'none'
    },
    logo: {
        width: '60px'
    },
    text: {
        fontSize: 20,
    }
  }));

function Header() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { role, name, pending} = useSelector( (state: AppState) => state.user )
    const { inCart } = useSelector( (state: AppState) => state.cart )
    // const history = useHistory();
    const isSignedIn = useUser();
    const [cartOpen, setCartOpen] = useState(false)

    let totalQuantity = 0;

   if(inCart && inCart.items){
    totalQuantity = inCart.items.reduce( (sum, i) => { 
        return sum + i.quantity
   }, 0)
   } 

    return (
        <Grid container className={classes.container}>
            <Grid item xs={10} sm={12} >      
                <Grid item container justify="center"> <Typography variant="h2" component="h2">RF-STORE</Typography> </Grid>
                <Grid item container justify="space-between"> 
                    <Grid item xs={3} sm={4}>
                    <Box my={2}  display="flex" alignItems="center">
                       <ul className={classes.socialMediaContainer}>
                           <li className={classes.listItem}>
                               <a href="nothing"><img className={classes.images} src={fbIcon} alt="Facebook Icon"></img></a>
                            </li>
                           <li className={classes.listItem}>
                               <a href="nothing"><img className={classes.images} src={instaIcon} alt="Instagram Icon"></img></a>
                            </li>
                           <li className={classes.listItem}>
                               <a href="nothing"><img className={classes.images} src={liIcon} alt="LinkedIn Icon"></img></a>
                            </li>

                       </ul>
                    </Box>
                    </Grid>
                    {role === "admin" ? "" : 
                    <Grid item xs={3} sm={4}>
                        <Box display="flex" justifyContent="center" p={2}> <Searchbar /></Box>
                    </Grid> }
                   

                    { 
                    // pending ?
                    
                    // <Grid item xs={5} sm={4} container justify="flex-end">
                    //     <CircularProgress />
                    // </Grid>
                    // :
                    isSignedIn ? 
                    <Grid item xs={5} sm={4} container justify="flex-end">
                        <Box m={2} pr={2} display="flex" alignItems="center">
                        <Typography className={classes.text}>Hello, {name}</Typography>
                        </Box>
                        <Box m={2}>
                        <Link to="/"><Button variant="contained" color="primary" onClick={()=> dispatch(userLogout())}>Logout</Button></Link>
                        </Box>
                    </Grid> 
                    : 
                    
                    <Grid item xs={5} sm={4} container justify="flex-end">
                        <Link to="/signin"><Button variant="contained" color="primary">Login</Button></Link>
                        <Link to="/signup"><Button variant="contained" color="secondary">Signup</Button></Link>
                    </Grid>
                  
                    }
                    
                </Grid> 
                <Grid item container justify="flex-start"> 

                    <Grid item sm={8}>
                        <Navbar />
                    </Grid>
                    {role === "user" ? (
                    <Grid item sm={4}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                        <Drawer
                        anchor="right"
                        open={cartOpen}
                        onClose={() => setCartOpen(false)}
                        >
                        <Cart />
                        </Drawer>
                        <Button  onClick={() => setCartOpen(true)}>
                            <Badge badgeContent={totalQuantity} color="error">
                                <AddShoppingCartIcon />
                            </Badge>
                        </Button>
                        </Box>
                    </Grid>
                    ) : ""}

                </Grid>
            </Grid>
        </Grid>
    )
}

export default Header