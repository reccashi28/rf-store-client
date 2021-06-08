import axios from "axios"
import { Dispatch } from "redux"
import { Cart, CartActions, ITEMS_IN_CART } from "../../types"

export const fetchCart = (userId: string) => {
    console.log(userId, "user id in action")
    return async (dispatch: Dispatch) => {
        axios.get(`/cart/${userId}`)
            .then(res => {
                dispatch(getItemsInCart(res.data))
            })
            .catch(err => {
                console.log('error')
            })
    }
}

export const getItemsInCart = (items: Cart): CartActions => {
    return {
        type: ITEMS_IN_CART,
        payload: {
            items,
        }
    }
}