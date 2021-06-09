import axios from "axios"
import { Dispatch } from "redux"
import { Cart, CartActions, ITEMS_IN_CART, ItemToCart } from "../../types"

export const fetchCart = (userId: string) => {
    console.log(userId, "user id in action")
    return async (dispatch: Dispatch) => {
        axios.get(`/cart/${userId}`)
            .then(res => {
                console.log(res.data, "from fetching user cart")
                res.data === null ? dispatch(getItemsInCart(undefined)) : dispatch(getItemsInCart(res.data))
                
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
    console.log(data, "attempt to adding to cart from action")
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