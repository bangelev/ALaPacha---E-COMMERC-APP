import React, { useEffect, useState } from 'react'

import { Button, Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {
  getAllProducts,
  clearError,
} from '../../../redux/actions/productActions'
import { useError } from '../../../customHooks/alerts'
import { useCalculatePrices } from '../../../customHooks/cartHooks'

import AccordionMenu from './AccordionMenu'
import ProductCard from './ProductCard'
import MetaData from '../../layout/MetaData'
import CartModal from '../../pages/cart/CartModal'

import Loader from '../../layout/Loader'

const categories = [
  'breakfast',
  'salad',
  'pizza',
  'main course',
  'soup',
  'appetizer',
  'burger',
  'pasta',
  'see food',
  'dessert',
  'oven cooked',
  'alcoholic drink',
  'non-alcoholic drink',
]

const MenuPage = () => {
  const [itemsPrice] = useCalculatePrices()
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  const { loading, products, error } = useSelector((state) => state.products)
  // const { cartItems } = useSelector((state) => state.cart)

  const alertError = useError()

  useEffect(() => {
    dispatch(getAllProducts())
    if (error) {
      alertError(error)
      // dispatch(clearError())
    }

    //eslint-disable-next-line
  }, [error])

  return (
    <>
      <MetaData title="Menu" />

      <div className="card mb-5 ">
        <img
          src="\images\sebastian-schuppik-H7xTpvBjJS4-unsplash.jpg"
          className="card-img-top"
          alt="..."
          style={{ height: '300px' }}
        />
        <div className="card-body text-center bg-dark text-light">
          <h2 className="card-title fw-4 fst-italic text-warning">
            La LaLaPacha MENU
          </h2>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        categories.map((category) => (
          <AccordionMenu category={category} key={category}>
            {products
              .filter((product) => product.category === category)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </AccordionMenu>
        ))
      )}
      <>
        <div className="d-grid gap-2 fixed-bottom">
          <Button
            variant="warning"
            size="lg"
            onClick={() => setShow(true)}
            disabled={!itemsPrice ? true : false}
          >
            {itemsPrice === 0
              ? 'Your cart is empty'
              : `Open cart - total ${itemsPrice} $`}
          </Button>
        </div>

        <Modal
          show={show}
          onHide={() => setShow(false)}
          // fullscreen={true}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Your order
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CartModal />
          </Modal.Body>
        </Modal>
      </>
    </>
  )
}

export default MenuPage
