import { Badge, Box, Button, Drawer, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getSignedInStatus, getUserRole, userLogout } from '../../redux/actions/user'
import { AppState } from '../../types'
import Navbar from '../NavBar/Navbar'
import axios from 'axios'
import useUser from '../../hooks/useUser'

import fbIcon from '../../assets/images/fb-icon.png'
import instaIcon from '../../assets/images/instagram-icon.png'
import liIcon from '../../assets/images/linkedin-icon.png'
import logo from '../../assets/images/logo.png'
import Cart from '../Cart/Cart';
import Searchbar from '../Searchbar/Searchbar';

const useStyles = makeStyles((theme) => ({
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
    }
  }));

function Header() {
    const dispatch = useDispatch()
    const { role, name } = useSelector( (state: AppState) => state.user )
    const classes = useStyles();
    const history = useHistory();
    const isSignedIn = useUser();
    const [cartOpen, setCartOpen] = useState(false)

    console.log(isSignedIn, "from login component")
    // const [signedIn, setsignedIn] = useState()
    // const [role, setRole] = useState("")
    // const [name, setName] = useState("")
    
    return (
//         <AppBar position="static">
//   <Toolbar>
//     <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//       <MenuIcon />
//     </IconButton>
//     <Typography variant="h6" className={classes.title}>
//       News
//     </Typography>
//     <Button color="inherit">Login</Button>
//   </Toolbar>
// </AppBar>
        <Grid container>
            <Grid item xs={10} sm={12} spacing={4}>      
                <Grid item container justify="center"> <Typography variant="h2" component="h2">RF-STORE</Typography> </Grid>
                <Grid item container justify="space-between"> 
                    <Grid item xs={3} sm={4}>
                    <Box my={2}  display="flex" alignItems="center">
                       <ul className={classes.socialMediaContainer}>
                           <li className={classes.listItem}>
                               <a href="#"><img className={classes.images} src={fbIcon}></img></a>
                            </li>
                           <li className={classes.listItem}>
                               <a href="#"><img className={classes.images} src={instaIcon}></img></a>
                            </li>
                           <li className={classes.listItem}>
                               <a href="#"><img className={classes.images} src={liIcon}></img></a>
                            </li>

                       </ul>
                    </Box>
                    </Grid>
                    <Grid item xs={3} sm={4}>
                        <Box display="flex" justifyContent="center" p={2}> <Searchbar /></Box>
                    </Grid>

                    {isSignedIn ? 
                    
                    <Grid item xs={5} sm={4} container justify="flex-end">
                        <Box m={2} pr={2} display="flex" alignItems="center">
                        <Typography>Hello, {name}</Typography>
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
                        <button onClick={() => setCartOpen(true)}>
                        <Badge badgeContent={0} color="error">
                            <AddShoppingCartIcon />
                        </Badge>
                        </button>
                        </Box>
                    </Grid>
                    ) : ""}

                </Grid>
            </Grid>
        </Grid>
    )
}

export default Header