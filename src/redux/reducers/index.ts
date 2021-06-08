import {combineReducers} from 'redux'
import product from './product'
import user from './user'
import cart from './cart'


const createRootReducer = () => 
combineReducers( {
    product,
    user,
    cart
})

export default createRootReducer;