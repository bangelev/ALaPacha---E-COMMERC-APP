import React, { Fragment } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../../../redux/actions/cartActions'
import { useCalculatePrices } from '../../../customHooks/cartHooks'
import MetaData from '../../layout/MetaData'

const CartModal = () => {
  let path = useLocation().pathname
  const isCartPath = path === '/cart'

  const [itemsPrice, taxPrice, shippingPrice, totalPrice] = useCalculatePrices()

  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)

  const increaseQty = (id, quantity) => {
    const newQty = quantity + 1
    dispatch(addToCart(id, newQty))
  }
  const decreaseQty = (id, quantity) => {
    if (quantity === 1) return
    const newQty = quantity - 1
    dispatch(addToCart(id, newQty))
  }
  const removeHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  return (
    <>
      <>
        {path === '/cart' && (
          <>
            <MetaData title={'Cart'} />
            <div className="container" id="sectionOne">
              <h1 className="mb-4 text-center">
                {/* {cartItems.length === 0 ? 'Your cart is empty' : 'Your Cart'} */}
              </h1>
            </div>
          </>
        )}
      </>
      {cartItems.length === 0 ? (
        <div>
          <h1 className="bg-light text-center">Your cart is empty</h1>
        </div>
      ) : (
        <Fragment>
          <div className={isCartPath ? 'row' : ''}>
            <div className={isCartPath ? 'col-lg-6' : ''}>
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
                          {/* <span>{item.price} $</span> */}
                          <span
                            className=" ms-3 fs-7 d-inline-block text-truncate"
                            style={{ maxWidth: '120px' }}
                          >
                            {item.name}
                          </span>
                        </div>
                        <div>
                          <button
                            className={
                              item.quantity === 1
                                ? 'text-muted btn btn-sm me-2'
                                : 'text-danger btn btn-sm me-2'
                            }
                            disabled={item.quantity === 1 ? true : false}
                            onClick={() =>
                              decreaseQty(item.product, item.quantity)
                            }
                          >
                            <i className="bi bi-dash-square fs-3"></i>
                          </button>
                          <span className="mx-1">{item.quantity}</span>

                          <button
                            className="text-warning btn btn-sm "
                            onClick={() =>
                              increaseQty(item.product, item.quantity)
                            }
                          >
                            <i className="bi bi-plus-square-dotted fs-3"></i>
                          </button>

                          <button
                            className="btn btn-sm btn-danger mt-2"
                            onClick={() => {
                              removeHandler(item.product)
                            }}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className={isCartPath ? 'col-lg-6' : ''}>
              <div className="card my-4 mx-2 border border-end-0 border-start-0 border-3 border-warning">
                <div className="card-body text-center">
                  <h5 className="card-title">Order Summary</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between ">
                      Order price :<span>{itemsPrice} $</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between ">
                      Tax price :<span>{taxPrice} $</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between ">
                      Shipping price :<span>{shippingPrice} $</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between mb-2 border border-end-0 border-start-0 border-3 border-warning">
                      Total price :<span>{totalPrice} $</span>
                    </li>
                  </ul>
                  <div className="d-grid gap-2">
                    <Link to="/shipping" className="btn btn-warning btn-sm">
                      Confirm Order
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  )
}

export default CartModal
