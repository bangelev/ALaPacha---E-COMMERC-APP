import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'

//product reducers
import {
    productsReducer,
    productDetailsReducer,
    newReviewReducer,
    productReviewsReducer,
} from './redux/reducers/productReducers'
//user reducers
import {
    authReducer,
    userReducer,
    forgotPasswordReducer,
} from './redux/reducers/userReducer'
//cart reducers
import { cartReducer } from './redux/reducers/cartReducer'
// order reducers
import {
    newOrderReducer,
    myOrdersReducer,
    orderDetailsReducer,
} from './redux/reducers/orderReducers'

const rootReducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    productReviews: productReviewsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    order: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
})
let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems')) :
            [],
        shippingInfo: localStorage.getItem('shippingInfo') ?
            JSON.parse(localStorage.getItem('shippingInfo')) :
            {},
    },
}

const middleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store