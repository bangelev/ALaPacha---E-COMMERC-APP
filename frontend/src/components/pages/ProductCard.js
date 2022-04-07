import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'

const ProductCard = ({ product }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <div className="col-12 col-lg-6 m-0">
        <div
          className="card mb-3 px-0 border-top-0 border-start-0 border-4 border-warning bg-light"
          style={{ maxWidth: '540px' }}
        >
          <div className="row g-0">
            <div className="col-4 pt-4 pb-0 px-4">
              <img
                src={product.images[0].url}
                className="img-fluid rounded-start pb-0"
                alt="..."
                style={{ width: '6rem', height: '6rem' }}
              />
            </div>
            <div className="col-8">
              <div className="card-body">
                <h5 className="card-title text-center">{product.name}</h5>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-light">
                    <span className="float-start">
                      Reviews: {product.ratings}
                    </span>
                    <span className="float-end">
                      <Link
                        to={`/products/${product._id}`}
                        className="btn btn-sm btn-warning px-3 py-0"
                      >
                        Details
                      </Link>
                    </span>
                  </li>
                  <li className="list-group-item bg-light">
                    <span className="float-start">Price {product.price} $</span>
                    <span className="float-end">
                      <Button
                        variant="danger"
                        onClick={handleShow}
                        className="btn-sm pe-3 ps-4 py-0"
                      >
                        Order
                      </Button>
                      {/* <button
                        type="button"
                        className="btn btn-sm btn-danger pe-3 ps-4 py-0"
                        data-bs-toggle="modal"
                        data-bs-target="#orderModal"
                      >
                        Order
                      </button> */}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              I will not close if you click outside me. Don't even try to press
              escape key.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary">Understood</Button>
            </Modal.Footer>
          </Modal>
          {/* <div
            className="modal fade"
            id="orderModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="orderModal"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="orderModal">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">Here u must put something</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Understood
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </>
      </div>
    </>
  )
}

export default ProductCard
