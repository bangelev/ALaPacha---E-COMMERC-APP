import React, { Fragment } from 'react'

const OrderCardDetails = ({ product }) => {
  return (
    <Fragment>
      <div className="offset-lg-3">
        <div
          className="card mb-3 px-0  border-top-0 border-start-0 border-end-0 border-4 border-warning "
          style={{ maxWidth: '540px' }}
        >
          <div className="row g-0 ">
            <div className="col-2 pt-4 mx-0">
              <img
                src={product.image}
                // src="\images\hamburger-doner-sandwich-chicken-nuggets-rice-vegetable-salad-chicken-sticks-caesar-salad-mushrooms-pizza-chicken-ragout-fr.jpg"
                className="img-fluid rounded-start pb-4 mb-1"
                alt="..."
                style={{ width: '5rem', height: '5rem' }}
              />
              <span className="badge bg-secondary position-absolute top-10 start-0 translate-middle badge rounded-pill bg-danger">
                {product.price} $
              </span>
            </div>
            <div className="col-10">
              <div className="card-body mt-3 ">
                <div className="card-header ">
                  {product.name}

                  <span className="float-end">
                    Quality - {product.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default OrderCardDetails
