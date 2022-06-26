import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Sidebar from './Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import {
  allAdminOrders,
  deleteOrder,
  clearError,
} from '../../../redux/actions/orderActions'
import { DELETE_ORDER_RESET } from '../../../redux/constants/orderConstants'
import { useError, useSuccess } from '../../../customHooks/alerts'

const OrderList = () => {
  const alertError = useError()
  const alertSuccess = useSuccess()
  const dispatch = useDispatch()
  const { loading, orders, error } = useSelector((state) => state.allOrders)
  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.order)
  useEffect(() => {
    dispatch(allAdminOrders())

    if (error) {
      alertError(error)
      dispatch(clearError())
    }
    if (deleteError) {
      alertError(deleteError)
      dispatch(clearError())
    }

    if (isDeleted) {
      alertSuccess('Order deleted')
      dispatch({ type: DELETE_ORDER_RESET })
    }
    // eslint-disable-next-line
  }, [dispatch, error, isDeleted])

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
  }
  const setOrders = () => {
    const data = {
      // columns Array of objects
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
        },

        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc',
        },
        {
          label: 'Payment',
          field: 'payment',
          sort: 'asc',
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    }

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        amount: `$ ${order.totalPrice}`,
        payment: order.paymentInfo.status,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes('Delivered') ? (
            <p style={{ color: 'green' }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: 'red' }}>{order.orderStatus}</p>
          ),
        actions: (
          <Fragment>
            <Link
              to={`/admin/orders/${order._id}`}
              className="btn btn-primary py-1 px-2 me-2"
            >
              <i className="bi bi-pencil-square"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              disabled={deleteLoading ? true : false}
              onClick={() => deleteOrderHandler(order._id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </Fragment>
        ),
      })
    })
    return data
  }

  return (
    <Fragment>
      <MetaData title={'All Orders'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <h2 id="sectionOne">All Orders</h2>
              <MDBDataTable
                data={setOrders()}
                className="mx-3"
                bordered
                striped
                hover
                responsiveSm
              />
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default OrderList
