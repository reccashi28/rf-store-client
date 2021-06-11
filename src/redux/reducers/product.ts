import { CREATE_NEW_PRODUCT, GET_PRODUCT_SUCCESS, ProductActions, ProductState, SEARCH_KEYWORD } from "../../types";

const initialState: ProductState = {
    displayProduct: [],
    searchProduct: ""
}
const product = ( state = initialState, action: ProductActions): ProductState => {
    switch(action.type) {
        case GET_PRODUCT_SUCCESS: {
            return {...state, displayProduct: action.payload.data}
        }

        case CREATE_NEW_PRODUCT: {
            const { data } = action.payload;

            if(state.displayProduct.find( p => p.name === data.name)){
                return state
            }
            return {
                ...state, displayProduct: [...state.displayProduct, data]
            }
        }

        case SEARCH_KEYWORD: {
            return {...state, searchProduct: action.payload.text}
        }

        default: {
            return state
        }
    } 
}

export default product;

// case ADD_PRODUCT: {
//     const { product } = action.payload
//     if (state.inCart.find((p) => p.id === product.id)) {
//       return state
//     }
//     Always return new state (e.g, new object) if changed
//     return { ...state, inCart: [...state.inCart, product] }
//   }