
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createNewUser } from '../../redux/actions/user';
import Notification from '../Notification/Notification'
import { useHistory } from 'react-router';
import { AppState } from '../../types';
import { Link } from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required')
})


export default function SignUp() {
  const dispatch = useDispatch()
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const classes = useStyles();
  const history = useHistory()
  const { role} = useSelector( (state: AppState) => state.user )
  const error = useSelector( (state: AppState) => state.user.error )
  
  const formik = useFormik( {
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(createNewUser(values, history, "signup"))
      setNotify({
        isOpen: true,
        message: 'User Created Successfully',
        type: 'success'
        })
    }
})
// let errorExist;
// useEffect( () => {
//   error ? errorExist = error : "" 
// }, [error])

console.log(error, "whats the error?")

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {role === "user" ? (
          <Typography component="h1" variant="h5">
          <Typography>Hello</Typography>
          Sign up
        </Typography>
        ) :
         (
          <Typography component="h1" variant="h5">
          Create User
        </Typography>
        )}
        
        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          {/* <pre>{JSON.stringify(formik.values, null, 3)}</pre> */}
        </form>
      </div>
         <div>{error ? `${error}` : ""}</div>
      {/* <Notification notify={notify} setNotify={setNotify}/> */}
    </Container>
  );
}