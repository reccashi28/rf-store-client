import { DIALOG_DATA, GET_USERS, GET_USER_ID, GET_USER_NAME, GET_USER_ROLE, SIGN_IN_SUCCESS, UserActions, UserState } from "../../types";

const initialState: UserState = {
    isSignedIn: false,
    role: "",
    name: "",
    userId: "",
    users: [],
    dialog: {
        isOpen: false,
        title: "",
        type: ""
    },
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
        case DIALOG_DATA: {
            return{...state, dialog: action.payload.dialog}
        }
        case GET_USER_ID: {
            return{...state, userId: action.payload.data}
        }
        default: {
            return state
        }
    } 
}

export default user;
