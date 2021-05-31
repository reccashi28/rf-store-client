import { GET_USER_NAME, GET_USER_ROLE, SIGN_IN_SUCCESS, UserActions, UserState } from "../../types";

const initialState = {
    isSignedIn: false,
    role: "",
    name: ""
}

const user = ( state = initialState, action: UserActions): UserState => {
    switch(action.type) {
        case SIGN_IN_SUCCESS: {
            console.log(action.payload.isUserSignedIn, "in reducer")
            return {...state, isSignedIn: action.payload.isUserSignedIn}
        }
        case GET_USER_ROLE: {
            console.log(action.payload.data, "in reducer")
            return {...state, role: action.payload.data}
        }
        case GET_USER_NAME: {
            console.log(action.payload.data, "in reducer")
            return {...state, name: action.payload.data}
        }
        default: {
            return state
        }
    } 
}

export default user;
