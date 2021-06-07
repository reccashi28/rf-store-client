import { DELETE_USER, GET_USERS, GET_USER_NAME, GET_USER_ROLE, SIGN_IN_SUCCESS, UserActions, UserState } from "../../types";

const initialState: UserState = {
    isSignedIn: false,
    role: "",
    name: "",
    users: [],
}

const user = ( state = initialState, action: UserActions): UserState => {
    switch(action.type) {
        case SIGN_IN_SUCCESS: {
            return {...state, isSignedIn: action.payload.isUserSignedIn}
        }
        case GET_USER_ROLE: {
            return {...state, role: action.payload.data}
        }
        case GET_USER_NAME: {
            return {...state, name: action.payload.data}
        }
        case GET_USERS: {
            return{...state, users: action.payload.data}
        }
        case DELETE_USER: {
            const { data } = action.payload
            console.log(data, "userid")
            const index = state.users.findIndex( user => user._id === data )
            console.log(index, "found")
            if (index >= 0) {
                state.users.splice(index, 1)
                return { ...state, users: [...state.users] }
            }
            console.log('deleted successfully')
            return state
        }
        default: {
            return state
        }
    } 
}

export default user;
