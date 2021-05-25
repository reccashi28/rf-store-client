import axios from "axios"
import { Dispatch } from "redux"
import { User } from "../../types"

export const createNewUser = (data: User) => {
    console.log(data, 'create user frontend action')
    return async (dispatch: Dispatch) => {
      axios.post('/users', data)
        .then( res => console.log(res.data))
        .catch( err => console.log(err))
    }
  }