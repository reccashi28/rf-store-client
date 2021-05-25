import { Dispatch } from "redux"
import axios from 'axios'

import { CREATE_NEW_PRODUCT, GET_PRODUCT_SUCCESS, Product, ProductActions } from "../../types"

export const fetchProduct = () => {
    return async (dispatch: Dispatch) => {
        const response = await fetch('/products')
        const data = await response.json()
        console.log(data)
        dispatch(getCountriesSuccess(data))
    }
}
export const getCountriesSuccess = (data: Product[]): ProductActions => {
    return {
      type: GET_PRODUCT_SUCCESS,
      payload: {
        data,
      },
    }
  }

export const createProduct = (data: Product) => {
  console.log(data, 'create product frontend action')
  return async (dispatch: Dispatch) => {
    axios.post('/products', data)
      .then( res => console.log(res.data))
      .catch( err => console.log(err))

  }
}


export const editProduct = (data: Product) => {
  return async (dispatch: Dispatch) => {
    axios.put(`/products/${data._id}`, data)
      .then( res => console.log(res.data, "edit product saved!"))
      .catch( err => console.log(err))

  }
}

export const deleteProduct = (id: string) => {
  return async (dispatch: Dispatch) => {
    axios.delete(`/products/${id}`)
      .then( res => {
        console.log(res.data, "edit product saved!")
      })
      .catch( err => console.log(err))

  }
}

export const addProduct = (data: Product): ProductActions => {
  return {
    type: CREATE_NEW_PRODUCT,
    payload: {
      data,
    }
  }
}