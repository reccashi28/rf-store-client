import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Grid, makeStyles } from '@material-ui/core';
import axios from 'axios'

import Home from './pages/Home/Home';
import ProductCatalog from './pages/ProductCatalog/ProductCatalog';
import Header from './components/Header/Header';
import AddNewProduct from './components/AddNewProduct/AddNewProduct';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';

import './App.css';
import Dashboard from './pages/Dashboard/Dashboard'

axios.defaults.withCredentials = true;

function App() {
  const useStyles = makeStyles({
    root: {
      paddingTop: 40,
    },
  });
  
    const classes = useStyles();
  return (
    <div>
    <Grid container className={classes.root}>
      <Grid item xs={1} sm={2}/>
      <Grid item xs={10} sm={8}>
        <Router>
          <Header />
          <Switch>
            
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route  path="/product">
              <ProductCatalog />
            </Route>
            <Route path="/addProduct">
              <AddNewProduct />
            </Route>
            <Route path="/editProduct/:_id">
              <AddNewProduct />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/signin">
              <Login />
            </Route>
          </Switch>
        </Router>   
      </Grid>
      <Grid item xs={1} sm={2}/>
    </Grid> 
    </div>
  );
}

export default App;
