import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'

import {
    productsReducer,
    productDetailsReducer,
} from './redux/reducers/productReducers'

const rootReducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
})
let initialState = {}

const middleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store