import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    RESET_ORDER_SUCCESS,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAILURE,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILURE,
    ADMIN_ORDERS_REQUEST,
    ADMIN_ORDERS_SUCCESS,
    ADMIN_ORDERS_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    DELETE_ORDER_FAILURE,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_RESET,
    UPDATE_ORDER_FAILURE,
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

export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return {
                loading: true,
            }
        case MY_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload.orders,
            }
        case MY_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
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

export const orderDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                order: {},
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload.order,
            }
        case ORDER_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
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

export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ADMIN_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADMIN_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                totalAmount: action.payload.totalAmount,
                orders: action.payload.orders,
            }
        case ADMIN_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
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

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ORDER_REQUEST:
        case UPDATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DELETE_ORDER_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload.success,
            }
        case UPDATE_ORDER_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload.success,
            }
        case DELETE_ORDER_FAILURE:
        case UPDATE_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload,
            }
        case DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false,
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