import { CartActions, CartState, ITEMS_IN_CART } from "../../types"

const cartInitState: CartState = {
    inCart: {
        purchasedBy: "",
        items: [],
        totalAmount: 0
    } || undefined
}

const cart = (state=cartInitState, action: CartActions): CartState => {
    switch(action.type){
        case ITEMS_IN_CART: {
            return {...state, inCart: action.payload.items}
        }
        default: {
            return state;
        }
    }
}

export default cart