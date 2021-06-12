import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../types';
import axios from 'axios'
import { fetchCart, fetchPending, getSignedInStatus, getUserId, getUserName, getUserRole } from '../redux/actions';

function useUser() {
   const dispatch = useDispatch();
    const { isSignedIn } = useSelector( (state: AppState) => state.user)

   const fetchCookie = async () => {
    dispatch(fetchPending())
    try {
      const res = await axios.get('/users/isloggedin');
      const resloggedIn =  res.data.signedin
      const resRole =  res.data.role
      const resName =  res.data.name
      const userId = res.data.userId
        dispatch(getSignedInStatus(resloggedIn))
        dispatch(getUserRole(resRole))
        dispatch(getUserName(resName))
        dispatch(getUserId(userId))
        dispatch(fetchCart(userId))

        
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
