import axios from 'axios'
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAILURE,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAILURE,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
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

        const { data } = await axios.get(`/api/v1/products/${id}`)

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

export const newReview = (reviewData) => async(dispatch) => {
    try {
        dispatch({
            type: NEW_REVIEW_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.put('/api/v1/reviews', reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAILURE,
            payload: error.response.data.message,
        })
    }
}

export const getProductsReviews = (productId) => async(dispatch) => {
    try {
        dispatch({ type: GET_REVIEWS_REQUEST })

        const { data } = await axios.get(`/api/v1/reviews?productId=${productId}`)

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: GET_REVIEWS_FAILURE,
            payload: error.response.data.message,
        })
    }
}

// admin
export const adminProducts = () => async(dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/products')

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const newProduct = (newProductData) => async(dispatch) => {
    try {
        dispatch({
            type: NEW_PRODUCT_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        const { data } = await axios.post(
            '/api/v1/admin/products',
            newProductData,
            config
        )

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAILURE,
            payload: error.response.data.message,
        })
    }
}

export const updateProduct = (newData, id) => async(dispatch) => {
    try {
        dispatch({
            type: UPDATE_PRODUCT_REQUEST,
        })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        const { data } = await axios.put(
            `/api/v1/admin/products/${id}`,
            newData,
            config
        )

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const deleteProduct = (productId) => async(dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/products/${productId}`)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Delete review by admin
export const deleteReview = (productId, reviewId) => async(dispatch) => {
    try {
        dispatch({
            type: DELETE_REVIEW_REQUEST,
        })

        const { data } = await axios.delete(
            `/api/v1/reviews?productId=${productId}&reviewId=${reviewId}`
        )

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
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