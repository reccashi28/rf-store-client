import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import { AppState } from '../types';
import createRootReducer from './reducers';

const middlewares = [thunk]

const initState: AppState = {
    product: {
        displayProduct: [],
    },
    user: {
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
    },
    cart: {
        inCart: {
            purchasedBy: "",
            items: [],
            totalAmount: 0
        } || undefined
    }
}

const store = createStore( createRootReducer(), initState ,compose(applyMiddleware(...middlewares)));
export default store;