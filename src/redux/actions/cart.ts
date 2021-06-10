import axios from "axios"
import { AnyAction, Dispatch } from "redux"
import { Cart, CartActions, ITEMS_IN_CART, ItemToCart } from "../../types"

export const fetchCart = (userId: string) => {
    return async (dispatch: Dispatch) => {
        if(userId) {
            axios.get(`/cart/${userId}`)
            .then(res => {
                if(res.data){
                    dispatch(getItemsInCart(res.data))
                }
            })
            .catch(err => {
                
            })
        }
       
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
                if(res.data) {
                    console.log("item added to cart")
                    fetchCart(data.purchasedBy)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}