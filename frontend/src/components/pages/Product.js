import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  useEffect(() => {
    console.log('Product RENDER')
  })
  return (
    <>
      <div className="col-sm-6 col-md-4 col-lg-3">
        <div className="card m-3 text-dark bg-light">
          <img
            src={product.images[0].url}
            className="img-fluid m-0"
            style={{ width: '18rem', height: '12rem' }}
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
          </div>
          <ul className="list-group list-group-flush ">
            <li className="list-group-item">
              <span className="float-start">Ratings:</span>
              <span className="float-end">{product.ratings}</span>
            </li>
            <li className="list-group-item">
              <span className="float-start">Price:</span>
              <span className="float-end">$ {product.price}</span>
            </li>
          </ul>

          <div className="card-body d-flex">
            <Link to="#" className="card-link btn btn-primary btn-sm ms-0">
              Details
            </Link>
            <button className="btn btn-primary btn-sm ms-auto d-inline">
              Order
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
