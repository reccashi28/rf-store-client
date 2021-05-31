import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../types';
import axios from 'axios'
import { getSignedInStatus, getUserName, getUserRole } from '../redux/actions';

function useUser() {
   const dispatch = useDispatch();
    const { isSignedIn} = useSelector( (state: AppState) => state.user)
    
   const fetchCookie = async () => {
    try {
      const res = await axios.get('/users/isloggedin');
      const resloggedIn =  res.data.signedin
      const resRole =  res.data.role
      const resName =  res.data.name
        console.log(res.data.signedin, "from hooks")
        dispatch(getSignedInStatus(resloggedIn))
        dispatch(getUserRole(resRole))
        dispatch(getUserName(resName))
      console.log(res.data.name, "fetch from backend")
    } catch (e) {
      console.log(e);
    }
  };
// console.log(isSignedIn, "still signed in?")

useEffect( () => {
   fetchCookie()
}, [])

return isSignedIn;

}

export default useUser
