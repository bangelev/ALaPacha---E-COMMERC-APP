import React, { Fragment, useEffect } from 'react'
import axios from 'axios'
import MetaData from '../../layout/MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { clearError } from '../../../redux/actions/orderActions'
import { useNavigate } from 'react-router-dom'
import { useError } from '../../../customHooks/alerts'
import useMakeOrder from '../../../customHooks/makeOrder'
import { RESET_ORDER_SUCCESS } from '../../../redux/constants/orderConstants.js'
import Loader from '../../layout/Loader'
import { useCalculatePrices } from '../../../customHooks/cartHooks'

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

const options = {
  style: {
    base: {
      fontSize: '16px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
}
const Payment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()
  const alertError = useError()
  const [orderData, makeOrder] = useMakeOrder()

  const [totalPrice] = useCalculatePrices()

  // const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
  // const { cartItems, shippingInfo } = useSelector((state) => state.cart)
  const { error, success } = useSelector((state) => state.order)

  const { user } = useSelector((state) => state.auth)

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

  const paymentData = {
    amount: Math.round(totalPrice * 100),
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    document.querySelector('#pay_btn').disabled = true

    let res
    const config = {
      'Content-Type': 'application/json',
    }
    try {
      res = await axios.post('/api/v1/payment/process', paymentData, config)
      const clientSecret = res.data.client_secret

      if (!stripe || !elements) {
        return
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      })

      if (result.error) {
        document.querySelector('#pay_btn').disabled = false
        alertError(result.error.message)
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          orderData.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }
          makeOrder()
        } else {
          alertError('There is some issue while payment processing')
        }
      }
    } catch (error) {
      document.querySelector('#pay_btn').disabled = false
      alert.error(error.response.data.message)
    }
  }

  return (
    <Fragment>
      {!stripe || !elements ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Confirm order'} />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                <strong>
                  Test Card Number 4242424242424242 or 4000056655665556
                </strong>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>

              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4">Card Info</h1>
                <div className="form-group">
                  <label htmlFor="card_num_field">Card Number</label>
                  <CardNumberElement
                    type="text"
                    id="card_num_field"
                    className="form-control"
                    options={options}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="card_exp_field">Card Expiry</label>
                  <CardExpiryElement
                    type="text"
                    id="card_exp_field"
                    className="form-control"
                    options={options}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="card_cvc_field">Card CVC</label>
                  <CardCvcElement
                    type="text"
                    id="card_cvc_field"
                    className="form-control"
                    options={options}
                  />
                </div>
                <div className="d-grid gap-2 col-lg-10 offset-lg-1 mb-4">
                  <button
                    id="pay_btn"
                    type="submit"
                    className="btn btn-block py-3"
                  >
                    Pay
                    {` - ${totalPrice && Number(totalPrice).toFixed(2)}  $`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Payment
