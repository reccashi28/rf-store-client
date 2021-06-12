import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

import { deleteUser, fetchUser, getDialogData } from '../../redux/actions';
import { AppState } from '../../types';
// import DashBoardUserForm from '../../components/DashBoardUserForm/DashBoardUserForm';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    marginTop: 50,
  }
});

function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { users } = useSelector((state: AppState) => state.user)

  useEffect( () => {
    dispatch(fetchUser())
  }, [dispatch])

  const tableHeaders = ["First Name", "Last Name", "Email", "Role", "Actions"]

  // type openDialogProps = {
  //   openDialog: boolean
  //   setOpenDialog: any
  // }

  // dispatch(getDialogData({isOpen: true, title: "Add New User", type: "add"}))
  
function handleEditUser(){
  dispatch(getDialogData({isOpen: true, title: "Update User", type: "edit"}))
  }

function handleDelete(userId: string) {
  if (window.confirm("Are you sure you want to delete this user?")) {
    dispatch(deleteUser(userId, history))
  } 
}

function handleAddUser() {
  dispatch(getDialogData({isOpen: true, title: "Add New User", type: "add"}))
  // setUserDialogForm({isOpen: true, title: "Add New User", type: "add"})
}

  return (
    <>
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" colSpan={tableHeaders.length}>
              <Link to={"/dashboard/adduser"}>
                <Button variant="contained" color="primary" onClick={() => handleAddUser()}>Add User</Button>
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            {tableHeaders.map( theader => <TableCell>{theader}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map( user => {
           return <TableRow key={user._id!}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Link to={`/dashboard/edit/${user._id!}`}>
                  <Button onClick={() => handleEditUser()}>
                    <EditIcon />
                  </Button>
                </Link>
                <Button onClick={ () => handleDelete(user._id!)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
    {/* <DashBoardUserForm userDialogForm={userDialogForm} setUserDialogForm={setUserDialogForm} /> */}
    </>
  );
}

export default Dashboard;