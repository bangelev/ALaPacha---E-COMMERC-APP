import axios from 'axios'
import { ADD_ITEM_TO_CART, REMOVE_FROM_CART } from '../constants/cardConstants'

export const addToCart = (id, quantity) => async(dispatch, getState) => {
    console.log('ACTION')
    const { data } = await axios.get(`/api/v1/products/${id}`)

    dispatch({
        type: ADD_ITEM_TO_CART,
        payload: {
            productID: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            quantity,
        },
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async(dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id,
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}