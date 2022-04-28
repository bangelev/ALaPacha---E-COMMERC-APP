import axios from 'axios'
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    CLEAR_ERROR,
} from '../constants/orderConstants'

export const createOrder = (orderData) => async(dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post('/api/v1/orders/new', orderData, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAILURE,
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