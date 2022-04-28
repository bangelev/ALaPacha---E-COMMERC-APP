import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    RESET_ORDER_SUCCESS,
    CLEAR_ERROR,
} from '../constants/orderConstants'

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                order: {},
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload.order,
                message: action.payload.message,
                success: action.payload.success,
            }
        case CREATE_ORDER_FAILURE:
            return {
                loading: false,
                order: {},
                success: false,
                error: action.payload,
            }
        case RESET_ORDER_SUCCESS:
            return {
                ...state,
                success: false,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}