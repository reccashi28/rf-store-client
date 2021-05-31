
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS'
export const CREATE_NEW_PRODUCT = 'CREATE_NEW_PRODUCT'
export const CREATE_NEW_USER = 'CREATE_NEW_USER'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const GET_USER_ROLE = 'GET_USER_ROLE'
export const GET_USER_NAME = 'GET_USER_NAME'
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
    firstName: string
  lastName: string
  email: string
  password: string
  isAdmin?: boolean
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

export type ProductActions = GetProductSuccess | CreateProduct

export type UserActions = CreateNewUser | SigninSuccess | GetUserRole | GetUserName

export type ProductState = {
    displayProduct: Product[]
}

export type UserState = {
    isSignedIn: boolean,
    role: string,
    name: string,
}
export type AppState = {
    product: ProductState,
    user: UserState
}