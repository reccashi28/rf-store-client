
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS'
export const CREATE_NEW_PRODUCT = 'CREATE_NEW_PRODUCT'
export const CREATE_NEW_USER = 'CREATE_NEW_USER'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const GET_USER_ROLE = 'GET_USER_ROLE'
export const GET_USER_NAME = 'GET_USER_NAME'
export const GET_USER_ID = 'GET_USER_ID'
export const GET_USERS = 'GET_USERS'
export const EDIT_USER = 'EDIT_USER'
export const DIALOG_DATA= 'DIALOG_DATA'
export const ITEMS_IN_CART= 'ITEMS_IN_CART'
export const SEARCH_KEYWORD = 'SEARCH_KEYWORD'
export const FETCH_PENDING = 'FETCH_PENDING'
export const FETCH_ERROR = 'FETCH_ERROR'

export type Product = {
    _id?: string
    name: string;
    description: string;
    categories: string;
    variants: string[];
    sizes: string[];
    price: number;
    quantity: number;
    productImage?: string;
}

export type SearchProduct = {
    type: typeof SEARCH_KEYWORD
    payload: {
      text: string
    }
  }

export type GetProductSuccess = {
    type: typeof GET_PRODUCT_SUCCESS,
    payload: {
        data: Product[]
    }
}

export type CreateProduct = {
    type: typeof CREATE_NEW_PRODUCT,
    payload: {
        data: Product
    }
}

export type User = {
    _id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
}

export type UserLogIn = {
    email: string
  password: string
}

export type CreateNewUser = {
    type: typeof CREATE_NEW_USER,
    payload: {
        data: User
    }
}

export type CreateNewUserError ={
    type: typeof FETCH_ERROR,
    payload: {
        data: Error | null
    }
}
export type SigninSuccess = {
    type: typeof SIGN_IN_SUCCESS,
    payload: {
        isUserSignedIn: boolean,
    }
}

export type GetUserRole = {
    type: typeof GET_USER_ROLE, 
    payload: {
        data: string,
    }
}
export type GetUserName = {
    type: typeof GET_USER_NAME, 
    payload: {
        data: string,
    }
}

export type GetUserId = {
    type: typeof GET_USER_ID,
    payload: {
        data: string,
    }
}
export type GetUsers = {
    type: typeof GET_USERS, 
    payload: {
        data: User[],
    }
}

export type EditUser = {
    type: typeof EDIT_USER, 
    payload: {
        data: User,
    }
}


export type DialogState = {
    isOpen: boolean,
    title: string,
    type: string,
}
export type GetDialogData = {
    type: typeof DIALOG_DATA,
    payload: {
        dialog: DialogState
    }
}

type itemsInCart = {
    productId: Product;
    quantity: number;
}

type addItemsToCart = {
    productId: string;
    quantity: number;
}

export type Cart = {
    purchasedBy: string;
    items: itemsInCart[];
    totalAmount: number;
}


export type ItemToCart = {
    purchasedBy: string;
    items: addItemsToCart[]
}

export type AddToCart = {
    type: typeof ITEMS_IN_CART,
    payload: {
        items: Cart | undefined
    }
}

export type FetchDataLoader = {
    type: typeof FETCH_PENDING,
}

export type ProductActions = GetProductSuccess | CreateProduct | SearchProduct 

export type UserActions = CreateNewUser | SigninSuccess | GetUserRole | GetUserName | GetUsers | EditUser | GetDialogData | GetUserId | FetchDataLoader | CreateNewUserError

export type CartActions = AddToCart | FetchDataLoader

export type ProductState = {
    displayProduct: Product[],
    searchProduct: string
}

export type UserState = {
    isSignedIn: boolean,
    role: string,
    name: string,
    userId: string,
    users: User[],
    dialog: DialogState,
    pending: boolean,
    error: Error | null
}

export type CartState = {
    inCart: Cart | undefined,
    pending: boolean
}

export type AppState = {
    product: ProductState,
    user: UserState,
    cart: CartState,
}