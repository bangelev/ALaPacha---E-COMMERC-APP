import axios from 'axios'
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERROR,
} from '../constants/productConstants'

export const getAllProducts = () => async(dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST })

        const { data } = await axios.get('/api/v1/products')

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message,
        })
    }
}

//product Details
export const getProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        console.log('FROM ACTION BEFORE GET REQUEST')
        const { data } = await axios.get(`/api/v1/products/${id}`)

        console.log('FROM ACTION AFTER GET REQUEST')

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}

// clear error
export const clearError = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERROR,
    })
}