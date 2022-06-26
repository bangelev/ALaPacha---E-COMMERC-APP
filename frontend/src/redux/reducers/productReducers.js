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
    NEW_REVIEW_RESET,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERROR,
} from '../constants/productConstants'

const initialState = {
    products: [],
}
export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                products: [],
            }
        case ALL_PRODUCTS_SUCCESS:
        case ADMIN_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
            }
        case ALL_PRODUCTS_FAIL:
        case ADMIN_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                loading: false,
                error: null,
            }
        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                imageUrl: action.payload.product.images[0].url,
            }
        case PRODUCT_DETAILS_FAIL:
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
export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
            }
        case NEW_REVIEW_FAILURE:
            return {
                ...state,
                error: action.payload,
            }
        case NEW_REVIEW_RESET:
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

export const productReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true,
                reviews: [],
            }
        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload.reviews,
            }
        case GET_REVIEWS_FAILURE:
            return {
                ...state,
                loading: false,
                errors: action.payload,
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

export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload.newProduct,
                success: action.payload.success,
            }
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            }
        case NEW_PRODUCT_FAILURE:
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

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                loading: true,
                isUpdated: action.payload.success,
            }

        case DELETE_PRODUCT_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload.success,
            }
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false,
            }
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false,
            }
        case UPDATE_PRODUCT_FAIL:
        case DELETE_PRODUCT_FAIL:
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

// all reviews reducer
// export const productReviewReducer = (state = { reviews: [] }, action) => {
//         switch (action.type) {
//           case GET_REVIEWS_REQUEST:
//             return {
//               ...state,
//               loading: true,
//             }
//           case GET_REVIEWS_SUCCESS:
//             return {
//               loading: false,
//               reviews: action.payload,
//             }
//           case GET_REVIEWS_FAILURE:
//             return {
//               ...state,
//               error: action.payload,
//             }

//           case CLEAR_ERROR:
//             return {
//               ...state,
//               error: null,
//             }
//           default:
//             return state
//         }
//     }
//DELETE REVIEW
export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }

        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload,
            }

        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false,
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