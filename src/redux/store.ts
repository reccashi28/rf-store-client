import { createStore, applyMiddleware, compose} from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'

import { AppState } from '../types';
import createRootReducer from './reducers';

const middlewares = [thunk]
let composeEnhancers = compose

const initState: AppState = {
    product: {
        displayProduct: [],
        searchProduct: "",
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
        pending: false,
        userErrorMessage: null
    },
    cart: {
        inCart: {
            purchasedBy: "",
            items: [],
            totalAmount: 0
        },
        pending: false,
    },
}

declare module 'redux' {
    interface Dispatch<A extends Action = AnyAction> {
      <S, E, R>(asyncAction: ThunkAction<R, S, E, A>): R;
    }
  }

if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }


const store = createStore( createRootReducer(), initState ,composeEnhancers(applyMiddleware(...middlewares)));
export default store;