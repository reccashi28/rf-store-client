import axios from "axios"
import { Dispatch } from "redux"
import { GET_USER_ROLE, SIGN_IN_SUCCESS, User, UserActions, UserLogIn, GET_USER_NAME, GET_USERS, DialogState, DIALOG_DATA, GET_USER_ID, FETCH_PENDING, FETCH_ERROR } from "../../types"
import { getItemsInCart } from "./cart"

export const createNewUser = (data: User, history: any, from : string) => {
    return async (dispatch: Dispatch) => {
      axios.post('/users', data)
        .then( res => {
          if(res.data) {
            fetchUser()
            from === "signup" ? history.push('/signin') : history.push('/dashboard')
            
          }
        })
        .catch( err => {
          if(err.response.data.message) {
            createUserError(err.response.data.message)
            console.log(err.response.data.message)
          }
        })
    }
  }

export const userLogin = (loginData: UserLogIn, history: any) => {
  return async (dispatch: Dispatch) => {
    axios.post('/users/login', loginData)
      .then( res => {
        dispatch(getSignedInStatus(true))
        dispatch(getUserRole(res.data.role))
        dispatch(getUserId(res.data.userId))
        dispatch(getUserName(res.data.name))
        // dispatch(fetchCart(userId))
        res.data.role === "admin" ? history.push('/dashboard') : history.push('/')
      })
      .catch( err => console.log(err))
  }
}

export const userLogout = () => {
  return async (dispatch: Dispatch) => {
    axios.get('/users/logout')
      .then( res => {
        dispatch(getSignedInStatus(false))
        dispatch(getUserRole("user"))
        dispatch(getItemsInCart({purchasedBy: "",
        items: [],
        totalAmount: 0}))
      })
      .catch( err => console.log(err))
  }
}

export const getSignedInStatus = ( isUserSignedIn: boolean): UserActions => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      isUserSignedIn,
    }
  }
}

export const getUserRole = ( data: string): UserActions => {
  return {
    type: GET_USER_ROLE,
    payload: {
      data,
    }
  }
}

export const getUserName = ( data: string): UserActions => {
  return {
    type: GET_USER_NAME,
    payload: {
      data,
    }
  }
}

export const fetchUser = () => {
  return async (dispatch: Dispatch) => {
    axios.get('/users')
      .then( res => dispatch(getUsers(res.data)))
      .catch( err => console.log(err))
  }
}

export const getUsers = ( data: User[]): UserActions => {
  return {
    type: GET_USERS,
    payload: {
      data,
    }
  }
}

export const getUserId = ( data: string): UserActions => {
  return {
    type: GET_USER_ID,
    payload: {
      data,
    }
  }
}

export const deleteUser = ( data: string, history: any) => {
  return async (dispatch: Dispatch) => {
    axios.delete(`/users/${data}`)
      .then( res => {
        if(res.data) {
          fetchUser()
          history.push('/dashboard')
        }
      })
      .catch( err => console.log(err))
  }
}


export const getDialogData = ( dialog: DialogState ): UserActions => {
  return {
    type: DIALOG_DATA,
    payload: {
      dialog,
    }
  }
}

export const updateUser = (data: User, history: any) => {
  return async (dispatch: Dispatch) => {
    axios.put(`/users/${data._id}`, data)
      .then( res => {
        if(res.data) {
          fetchUser()
          history.push('/dashboard')
        }
      })
      .catch( err => console.log(err))
  }
}

export const fetchPending = (): UserActions => {
  return {
    type: FETCH_PENDING,
  }
}


export const createUserError = ( data: Error | null): UserActions => {
  return {
    type: FETCH_ERROR,
    payload: {
      data,
    }
  }
}