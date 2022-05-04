import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useError } from '../../../customHooks/alerts'

import Loader from '../../layout/Loader'
import MetaData from '../../layout/MetaData'
import OrderCardDetails from './OrderCardDetails'
import {
  getOrderDetails,
  clearError,
} from '../../../redux/actions/orderActions'

const OrdersList = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const alertError = useError()

  const { loading, error, order } = useSelector((state) => state.orderDetails)
  const orderItems = order && order.orderItems

  useEffect(() => {
    dispatch(getOrderDetails(id))
    if (error) {
      alertError(error)
      dispatch(clearError())
    }
  }, [id])

  return (
    <Fragment>
      <MetaData title={'Order Details'} />
      <div className="container  " id="sectionOne">
        <div
          className="col-lg-6 offset-lg-3 mb-3"
          style={{ maxWidth: '540px' }}
        >
          <div className="card-header text-center">Order Details</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {order &&
                order.createdAt &&
                order.createdAt.toString().slice(0, 10)}
              <span className="float-end">
                Total Price- $ {order && order.totalPrice}
              </span>
            </li>
          </ul>
        </div>
        {loading ? (
          <Loader />
        ) : (
          orderItems &&
          orderItems.map((product) => (
            <OrderCardDetails key={product._id} product={product} />
            // <p>1</p>
          ))
        )}
      </div>
    </Fragment>
  )
}

export default OrdersList
