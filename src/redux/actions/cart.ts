import axios from "axios"
import { AnyAction, Dispatch } from "redux"
import { Cart, CartActions, ITEMS_IN_CART, ItemToCart } from "../../types"

export const fetchCart = (userId: string) => {
    return async (dispatch: Dispatch) => {
        axios.get(`/cart/${userId}`)
            .then(res => {
                dispatch(getItemsInCart(res.data))
            })
            .catch(err => {
                console.log('error', err)
            })
    }
}

export const getItemsInCart = (items: Cart | undefined): CartActions => {
    return {
        type: ITEMS_IN_CART,
        payload: {
            items,
        }
    }
}

export const addItemToCart = (data: ItemToCart) => {
    return async (dispatch: Dispatch) => {
        axios.post('/cart', data)
            .then( res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}