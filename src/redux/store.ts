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
        isSignedIn: false
    }
}

const store = createStore( createRootReducer(), initState ,compose(applyMiddleware(...middlewares)));
export default store;