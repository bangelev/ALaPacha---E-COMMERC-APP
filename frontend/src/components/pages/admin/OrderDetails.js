import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useSuccess, useError } from '../../../customHooks/alerts'

import {
  getOrderDetails,
  updateOrder,
  clearError,
} from '../../../redux/actions/orderActions'
import { UPDATE_ORDER_RESET } from '../../../redux/constants/orderConstants'
import OrderCardDetails from '../order/OrderCardDetails'

import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import Sidebar from './Sidebar'

const OrderDetails = () => {
  const navigate = useNavigate()
  const alertSuccess = useSuccess()
  const alertError = useError()
  const dispatch = useDispatch()
  const { id } = useParams()

  const [status, setStatus] = useState('')
  const { loading, order } = useSelector((state) => state.orderDetails)
  const {
    loading: updateLoading,
    error,
    isUpdated,
  } = useSelector((state) => state.order)
  const shippingInfo = order && order.shippingInfo

  useEffect(() => {
    dispatch(getOrderDetails(id))

    if (isUpdated) {
      alertSuccess(`Order is ${status}`)
      navigate(-1)
      dispatch({ type: UPDATE_ORDER_RESET })
    }
    if (error) {
      alertError(error)
      dispatch(clearError())
    }
  }, [id, isUpdated, error])
  const updateOrderHandler = (id) => {
    const formData = new FormData()
    formData.set('status', status)

    dispatch(updateOrder(id, formData))
  }
  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-2">
          <Sidebar />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Order Details" />

            <div className="col-sm-6 mx-0 " id="sectionTwo">
              <h5>
                Order ID:
                <span className="text-muted fs-6">
                  {` ${order && order._id}`}
                </span>
              </h5>
              <Fragment>
                <div className="card my-4 mx-2 border border-end-0 border-start-0 border-3 border-warning">
                  <div className="card-body text-center">
                    <h5 className="card-title">Shipping Info</h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between ">
                        Name :
                        <span className="text-muted">
                          {order && order.user.name}{' '}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between ">
                        Phone :
                        <span className="text-muted">
                          {order && order.shippingInfo.phoneNumber}{' '}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between ">
                        Address:
                        <span className="text-muted">
                          {shippingInfo &&
                            `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zipCode} ${shippingInfo.country}`}
                        </span>
                        {/* Address :<span>{fullAddress} </span> */}
                      </li>
                    </ul>
                  </div>
                </div>
              </Fragment>
              {/* Payment */}
              <Fragment>
                <div className="card my-4 mx-2 border border-end-0 border-start-0 border-3 border-warning">
                  <div className="card-body text-center">
                    <h5 className="card-title">Payment Info</h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between ">
                        {order && order.paymentInfo.status === 'succeeded' ? (
                          <span style={{ color: 'green' }}>PAID</span>
                        ) : (
                          <span style={{ color: 'red' }}>ON-Delivery</span>
                        )}
                      </li>
                      <li className="list-group-item d-flex justify-content-between ">
                        ID:
                        <span className="fs-7  text-muted">
                          {order && order.paymentInfo.id}{' '}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Fragment>
              {/* End */}
              <Fragment>
                <div className="card my-4 mx-2 border border-end-0 border-start-0 border-3 border-warning">
                  <div className="card-body text-center">
                    <h5 className="card-title">Order Status</h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between ">
                        {order && (
                          <span
                            style={{
                              color: `${
                                order.orderStatus === 'Processing'
                                  ? 'red'
                                  : 'green'
                              }`,
                            }}
                          >
                            {order.orderStatus}
                          </span>
                        )}
                        <span>
                          {order && order.deliveredAt
                            ? order.deliveredAt.toString().slice(0, 10)
                            : null}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Fragment>
              <h5>Order Items</h5>
              {order &&
                order.orderItems.map((product) => (
                  <OrderCardDetails product={product} key={product._id} />
                ))}
            </div>
            <div className="col-sm-3" id="sectionTwo">
              <h5 className="mb-4">Status</h5>
              <div className="form-group">
                <select
                  className="form-control"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <div className="d-grid gap-2 my-3">
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => updateOrderHandler(order._id)}
                >
                  Update Status
                </button>
              </div>
            </div>
            {/* </div> */}
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

export default OrderDetails
