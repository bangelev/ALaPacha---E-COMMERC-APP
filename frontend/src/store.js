import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'

//product reducers
import {
    productsReducer,
    productDetailsReducer,
} from './redux/reducers/productReducers'
//user reducers
import {
    authReducer,
    userReducer,
    forgotPasswordReducer,
} from './redux/reducers/userReducer'

const rootReducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
})
let initialState = {}

const middleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store