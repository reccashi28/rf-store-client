import { Box, Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../NavBar/Navbar'

function Header() {
    return (
        <Grid container>
            <Grid item xs={10} sm={12}>
                <Grid item container justify="space-between"> 
                    <Grid item xs={3} sm={4}>
                       <Typography>social</Typography>
                    </Grid>
                    <Grid item xs={5} sm={4} container justify="flex-end">
                        <Link to="/login"><Button variant="contained" color="primary">Login</Button></Link>
                        <Link to="/signup"><Button variant="contained" color="secondary">Signup</Button></Link>
                    </Grid>
                </Grid> 
                <Grid item container justify="center"> 
                    <Grid item sm={12}>
                    <Box display="flex" justifyContent="center"> <Typography>search</Typography></Box>
                    </Grid>
                    <Grid item sm={12}>
                        <Navbar />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Header