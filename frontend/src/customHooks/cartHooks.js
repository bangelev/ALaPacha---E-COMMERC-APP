import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export const useCalculatePrices = () => {
    const { cartItems } = useSelector((state) => state.cart)
    const itemsPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )
    const taxPrice = itemsPrice > 0 ? (itemsPrice * 5) / 100 : 0
    const shippingPrice = cartItems.length > 0 && itemsPrice > 20 ? 0 : 5
    const totalPrice = itemsPrice + taxPrice + shippingPrice

    return [itemsPrice, taxPrice, shippingPrice, totalPrice]
}