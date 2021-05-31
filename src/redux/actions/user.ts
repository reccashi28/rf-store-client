import axios from "axios"
import { Dispatch } from "redux"
import { GET_USER_ROLE, SIGN_IN_SUCCESS, User, UserActions, UserLogIn, GET_USER_NAME } from "../../types"

export const createNewUser = (data: User) => {
    return async (dispatch: Dispatch) => {
      axios.post('/users', data)
        .then( res => console.log(res.data))
        .catch( err => console.log(err))
    }
  }

export const userLogin = (loginData: UserLogIn) => {
  return async (dispatch: Dispatch) => {
    axios.post('/users/login', loginData)
      .then( res => {
        console.log(res.data, "login success from user action")
        dispatch(getSignedInStatus(true))
        dispatch(getUserRole(res.data.role))
        
      })
      .catch( err => console.log(err))
  }
}

export const userLogout = () => {
  return async (dispatch: Dispatch) => {
    axios.get('/users/logout')
      .then( res => {
        console.log(res.data, "logout success")
        dispatch(getSignedInStatus(false))
        dispatch(getUserRole("user"))
      })
      .catch( err => console.log(err))
  }
}

export const getSignedInStatus = ( isUserSignedIn: boolean): UserActions => {
  console.log("is signedin in action ", isUserSignedIn)
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      isUserSignedIn,
    }
  }
}

export const getUserRole = ( data: string): UserActions => {
  console.log("in action ", data)
  return {
    type: GET_USER_ROLE,
    payload: {
      data,
    }
  }
}

export const getUserName = ( data: string): UserActions => {
  console.log("in action ", data)
  return {
    type: GET_USER_NAME,
    payload: {
      data,
    }
  }
}
