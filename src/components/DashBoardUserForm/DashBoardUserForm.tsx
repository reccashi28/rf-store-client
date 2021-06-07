import { Button, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Link, MenuItem, TextField, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createNewUser, fetchUser } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, User } from '../../types';


const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dialog: {
    margin: theme.spacing(5)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "",
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required')
})

function DashBoardUserForm() {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory()
  // const {userDialogForm, setUserDialogForm} = props;
  const classes = useStyles();
  const dispatch= useDispatch()
  const { users } = useSelector( (state: AppState) => state.user)
  const { _id } = useParams<{ _id: string }>()
  const [userDialogForm, setUserDialogForm] = useState({isOpen: false, title: '', type: ''})
  const filteredData: any = users.filter ( user => user._id === _id)

  const handleClose = () => {
    setUserDialogForm({
      ...userDialogForm,
      isOpen: false,
    });
    history.push('/dashboard')
  };

  if(_id){
    setUserDialogForm({
      ...userDialogForm,
      isOpen: true,
    });
  }
console.log(_id, "id data")

  const handleAddUser = (values: any) => {
    dispatch(createNewUser(values, history, "dashboard"))
    dispatch(fetchUser())
    setUserDialogForm({
      ...userDialogForm,
      isOpen: false,
    });
  }
  const formik = useFormik( {
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // dispatch(createNewUser(values))
      // setNotify({
      //   isOpen: true,
      //   message: 'User Created Successfully',
      //   type: 'success'
      //   })
      history.push('/dashboard')
    }
})

    return (
      <div className={classes.dialog}>
        <Dialog
        fullScreen={fullScreen}
        open={true}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle>
            {userDialogForm.title}
          </DialogTitle>
          <DialogContent>
              <CssBaseline />
              <div className={classes.paper}>                
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
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
                    <Grid item xs={12}>
                      <TextField
                      id="roles"
                      select
                      label="Select Role"
                      onChange={formik.handleChange}
                      variant="outlined"
                      name="role"
                      value={formik.values.role}
                      fullWidth
                      defaultValue
                      >
                          <MenuItem value="admin">admin</MenuItem>
                          <MenuItem value="user">user</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                  <pre>{JSON.stringify(formik.values, null, 3)}</pre>
                </form>
              </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary" variant="contained">
              Cancel
            </Button>

            {userDialogForm.type === "add" ? 
            
            <Button type="submit" color="primary" variant="contained" onClick={ () => handleAddUser(formik.values)}>
              Submit
            </Button> 
            :  
            <Button onClick={handleClose} color="primary" variant="contained">
              Update
            </Button>}
           
            
          </DialogActions>
        </Dialog>
        </div>
    )
}

export default DashBoardUserForm
