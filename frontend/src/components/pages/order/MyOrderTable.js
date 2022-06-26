import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import { myOrders, clearError } from '../../../redux/actions/orderActions'
import { useError } from '../../../customHooks/alerts'

const MyOrderTable = () => {
  const dispatch = useDispatch()
  const { loading, orders, error } = useSelector((state) => state.myOrders)
  const alertError = useError()

  useEffect(() => {
    dispatch(myOrders())
    // console.log(orders[0])
    if (error) {
      alertError(error)
      dispatch(clearError())
    }
    // eslint-disable-next-line
  }, [dispatch, error])

  const setOrders = () => {
    const data = {
      // columns Array of objects
      columns: [
        {
          label: 'Date',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Meals ',
          field: 'numOfItems',
          sort: 'asc',
          width: '50px',
        },
        {
          label: 'Amount',
          field: 'amount',
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
        // id: order._id,
        id: order.createdAt.toString().slice(0, 10),
        numOfItems: order.orderItems.length,
        amount: `$ ${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes('Delivered') ? (
            <p style={{ color: 'green' }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: 'red' }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/orders/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      })
    })
    return data
  }
  return (
    <Fragment>
      <MetaData title={'My orders'} />
      <div className="container" id="sectionOne">
        <h1 className="my-5">My orders</h1>
        {loading ? (
          <Loader />
        ) : (
          <MDBDataTable
            data={setOrders()}
            className="mx-3"
            bordered
            striped
            hover
            responsiveSm
          />
        )}
      </div>
    </Fragment>
  )
}

export default MyOrderTable
