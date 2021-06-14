
import { CartActions, CartState, FETCH_PENDING, ITEMS_IN_CART } from "../../types"

const cartInitState: CartState = {
    inCart: {
        purchasedBy: "",
        items: [],
        totalAmount: 0
    } || undefined,
    pending: false
}

const cart = (state=cartInitState, action: CartActions): CartState => {
    switch(action.type){
        case FETCH_PENDING: {
            return {...state, pending: true}
        }
        case ITEMS_IN_CART: {
            const {items} = action.payload
            return {...state, pending: false, inCart: items}
        }
        default: {
            return state;
        }
    }
}

export default cart