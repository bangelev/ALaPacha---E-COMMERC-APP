import React, { Fragment, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useCalculatePrices } from '../../../customHooks/cartHooks'

import { RESET_ORDER_SUCCESS } from '../../../redux/constants/orderConstants.js'

import { useError } from '../../../customHooks/alerts'
import useMakeOrder from '../../../customHooks/makeOrder'
import CheckoutSteps from './CheckoutSteps'

import { clearError } from '../../../redux/actions/orderActions'

const ConfirmOrder = () => {
  const [orderData, makeOrder] = useMakeOrder()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alertError = useError()
  const { cartItems, shippingInfo } = useSelector((state) => state.cart)

  const { error, success } = useSelector((state) => state.order)

  const { address, city, zipCode, country, phoneNumber } = shippingInfo
  const fullAddress = `${address}, ${city}, ${zipCode} ${country}`
  const [itemsPrice, taxPrice, shippingPrice, totalPrice] = useCalculatePrices()

  const { user } = useSelector((state) => state.auth)

  const processToPayment = () => {
    // const data = {
    //   itemsPrice,
    //   taxPrice,
    //   shippingPrice,
    //   totalPrice,
    // }
    // sessionStorage.setItem('orderInfo', JSON.stringify(data))
    navigate('/payment')
  }
  useEffect(() => {
    if (success) {
      dispatch({ type: RESET_ORDER_SUCCESS })
      navigate('/success')
    }
    if (error) {
      alertError(error)
      dispatch(clearError())
    }
    //eslint-disable-next-line
  }, [success, error])
  const makeOrderHandler = () => {
    orderData.paymentInfo = {
      id: uuidv4(),
      status: 'on-delivery',
    }

    makeOrder()
  }
  return (
    <Fragment>
      <CheckoutSteps shipping confirmOrder />
      <div className="row wrapper">
        <div className="col-lg-10 offset-lg-1">
          <div className="card my-4 mx-2 border border-end-0 border-start-0 border-3 border-warning">
            <ul className="list-group list-group-flush ">
              {cartItems &&
                cartItems.map((item) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center "
                    key={item.product}
                  >
                    <span className="badge bg-secondary position-absolute top-50 start-0 translate-middle badge rounded-pill bg-danger">
                      {item.price} $
                    </span>
                    <div className="">
                      <span
                        className=" ms-3 fs-7 d-inline-block text-truncate"
                        style={{ maxWidth: '120px' }}
                      >
                        {item.quantity}
                        &nbsp;
                        <span className="text-muted fs-7">{item.name}</span>
                      </span>
                    </div>
                    <div>{item.quantity * item.price} $</div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="col-lg-6 offset-lg-1">
          <div className="card my-4 mx-2 border border-end-0 border-start-0 border-3 border-warning">
            <div className="card-body text-center">
              <h5 className="card-title">Shipping Info</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between ">
                  Name :<span>{user.name} </span>
                </li>
                <li className="list-group-item d-flex justify-content-between ">
                  Phone :<span>{phoneNumber} </span>
                </li>
                <li className="list-group-item d-flex justify-content-between ">
                  Address :<span>{fullAddress} </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-4 ">
          <div className="card my-4 mx-2 border border-end-0 border-start-0 border-3 border-warning">
            <div className="card-body text-center">
              <h5 className="card-title">Order Summary</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between ">
                  Subtotal :<span>{itemsPrice} $</span>
                </li>
                <li className="list-group-item d-flex justify-content-between ">
                  Tax :<span>{taxPrice} $</span>
                </li>
                <li className="list-group-item d-flex justify-content-between ">
                  Shipping :<span>{shippingPrice} $</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="d-grid gap-2 col-lg-10 offset-lg-1 mb-4">
          <h5 className="text-center">Payment Methods</h5>
          <button className="btn btn-warning btn-sm" onClick={processToPayment}>
            Proceed to Payment {totalPrice} $
          </button>
          <button className="btn btn-warning btn-sm" onClick={makeOrderHandler}>
            On delivery {totalPrice} $
          </button>
        </div>
      </div>
    </Fragment>
  )
}

export default ConfirmOrder
