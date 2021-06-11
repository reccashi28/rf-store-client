// import React, { useEffect } from 'react'
// import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { getUserRole, getSignedInStatus } from '../../redux/actions/user';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    homeContainer: {
      marginTop: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

    }
  });
  
function Home() {
  const classes = useStyles();

    return (
        <div className={classes.homeContainer}>
           <Typography variant="h1" component="h1">Welcome dear customers.</Typography>
        </div>
    )
}

export default Home
