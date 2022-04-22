import { ADD_ITEM_TO_CART, REMOVE_FROM_CART } from '../constants/cardConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            const item = action.payload

            const isItemExists = state.cartItems.find(
                (i) => i.productID === item.productID
            )

            if (isItemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.productID === isItemExists.productID ? item : i
                    ),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.productID !== action.payload
                ),
            }

        default:
            return state
    }
}