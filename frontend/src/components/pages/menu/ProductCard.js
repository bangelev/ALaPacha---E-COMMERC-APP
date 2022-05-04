import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { NEW_REVIEW_RESET } from '../../../redux/constants/productConstants'

// import { useSuccess } from '../../../customHooks/alerts'
import '../../../App.css'
import { Modal, Button } from 'react-bootstrap'
import NewReview from './NewReview'
import StarRating from '../../layout/StarRating'
import Reviews from './Reviews'

import { addToCart } from '../../../redux/actions/cartActions'

const ProductCard = ({ product }) => {
  const { success } = useSelector((state) => state.newReview)

  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  const addItemHandler = (id) => {
    dispatch(addToCart(id, quantity))
    setShow(false)
  }
  const incrementHandler = () => {
    setQuantity((prev) => prev + 1)
  }
  const decrementHandler = () => {
    if (quantity === 1) return
    setQuantity((prev) => prev - 1)
  }
  useEffect(() => {
    if (success) {
      setShow(false)
    }
    //eslint-disable-next-line
  }, [product.reviews, success])
  return (
    <>
      <div className="col-12 col-lg-6 m-0 " id="cardPoint">
        <div
          className="card mb-3 px-0 border-top-0 border-start-0 border-4 border-warning bg-light "
          style={{ maxWidth: '540px' }}
          onClick={() => setShow(true)}
        >
          <div className="row g-0">
            <div className="col-2 pt-4 mx-0">
              <img
                src={product.images[0].url}
                className="img-fluid rounded-start pb-0 mb-1"
                alt="..."
                style={{ width: '5rem', height: '5rem' }}
              />
              <span className="badge bg-secondary position-absolute top-10 start-0 translate-middle badge rounded-pill bg-danger">
                {product.price} $
              </span>
            </div>
            <div className="col-10">
              <div className="card-body  ">
                <h5 className="card-title text-start m-0 pt-1">
                  {product.name}
                </h5>
                <p
                  style={{ fontSize: '11px' }}
                  className="text-muted text-end m-0"
                >
                  {product.description}
                </p>
                <StarRating ratings={product.ratings} />
              </div>
            </div>
          </div>
        </div>
        <>
          <Modal show={show} onHide={handleClose} keyboard={false} centered>
            <Modal.Header closeButton>
              <Modal.Title className="muted">{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <>
                <div className="container">
                  <div className="card">
                    <img
                      src={product.images[0].url}
                      className="card-img-top"
                      style={{ height: '18rem' }}
                      alt="..."
                    />
                    <div className="card-body">
                      <span className="badge bg-secondary position-absolute top-0 start-0 translate-middle  rounded-pill bg-danger">
                        {product.price} $
                      </span>
                      <p
                        className="card-text text-muted text-center"
                        style={{ fontSize: '17px' }}
                      >
                        {product.description}
                      </p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <StarRating ratings={product.ratings} />

                        <span id="no_of_reviews">
                          ({product.numOfReviews} Reviews)
                        </span>
                      </li>
                    </ul>

                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <button
                            className={
                              quantity === 1
                                ? 'text-muted btn btn-sm me-2 '
                                : 'text-danger btn btn-sm me-2'
                            }
                            onClick={decrementHandler}
                            disabled={quantity === 1 ? true : false}
                          >
                            <i className="bi bi-dash-square fs-4"></i>
                          </button>

                          <button
                            className="text-danger btn btn-sm "
                            onClick={incrementHandler}
                          >
                            <i className="bi bi-plus-square-dotted fs-4"></i>
                          </button>
                        </div>
                        <Button
                          variant="warning"
                          size="sm"
                          className="pt-0 pb-0 mt-2 mb-1"
                          onClick={() => addItemHandler(product._id)}
                        >
                          <span className="badge bg-danger me-2">
                            {quantity}
                          </span>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                  <h5 className="text-center mt-3">Other's Reviews</h5>
                  {product.reviews.map((review) => (
                    <Reviews key={review._id} review={review} />
                  ))}

                  <NewReview productId={product._id} />
                </div>
              </>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </>
      </div>
    </>
  )
}

export default ProductCard
