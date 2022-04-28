import { useSelector, useDispatch } from 'react-redux'

import { useCalculatePrices } from '../customHooks/cartHooks'

import { createOrder } from '../redux/actions/orderActions'

const useMakeOrder = () => {
    const dispatch = useDispatch()

    const { cartItems, shippingInfo } = useSelector((state) => state.cart)

    const [itemsPrice, taxPrice, shippingPrice, totalPrice] = useCalculatePrices()
    const orderData = {
        shippingInfo,
        orderItems: cartItems,
        taxPrice,
        itemsPrice,
        shippingPrice,
        totalPrice,
    }
    const makeOrder = () => dispatch(createOrder(orderData))
    return [orderData, makeOrder]
}

export default useMakeOrder