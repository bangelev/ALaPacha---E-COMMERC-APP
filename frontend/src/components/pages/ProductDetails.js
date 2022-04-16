import React, { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import AlertDismissible from '../layout/AlertDismissible'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { getProductDetails } from '../../redux/actions/productActions'

const ProductDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, product, imageUrl, error } = useSelector(
    (state) => state.productDetails
  )
  let { id } = useParams()

  // console.log('RENDER', error)

  useEffect(() => {
    // console.log('USE EFFECT- BEFORE DISPATCH', error)
    dispatch(getProductDetails(id))

    // console.log('USE EFFECT - AFTER DISPATCH', error)
    //eslint-disable-next-line
  }, [])
  return (
    <>
      {/* {error && <AlertDismissible variant={'warning'} message={error} />} */}
      <MetaData title={`Product - ${product._id}`} />

      {loading ? (
        <Loader />
      ) : error ? (
        <AlertDismissible variant={'warning'} message={error} />
      ) : (
        <>
          <div className="container" id="sectionOne">
            <div className="card mb-3 col-10 offset-1">
              <div className="row g-0">
                <div className="col-md-6">
                  <img
                    src={imageUrl}
                    // src={product.images[0].url}
                    className="img-fluid"
                    alt="..."
                    style={{ width: '30rem', height: '20rem' }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body ">
                    <h5 className="card-title text-center fs-2 mt-4">
                      {product.name}
                    </h5>
                    <p className="card-text mt-3">{product.description}</p>
                    <p className="card-text  float-end pt-5">
                      <small className="text-muted fs-7 mb-0">
                        ID: {product._id}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-10 offset-1">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span className="float-start">Price</span>
                  <span className="float-end">$ {product.price}</span>
                </li>
                <li className="list-group-item">
                  <span className="float-start">Reviews</span>
                  <span className="float-end">{product.ratings}</span>
                </li>
                <li className="list-group-item">
                  <button className="btn btn-warning btn-sm float-start my-0">
                    Submit Review
                  </button>
                  <button
                    className="btn btn-warning btn-sm  px-5 float-end"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </li>
              </ul>
            </div>
            <h3 className="text-center">Other's Reviews</h3>
          </div>
        </>
      )}
    </>
  )
}

export default ProductDetails
