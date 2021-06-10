import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import { AppState } from '../types';
import createRootReducer from './reducers';

const middlewares = [thunk]
let composeEnhancers = compose

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

if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }


const store = createStore( createRootReducer(), initState ,composeEnhancers(applyMiddleware(...middlewares)));
export default store;