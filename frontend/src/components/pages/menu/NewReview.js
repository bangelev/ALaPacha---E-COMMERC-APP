import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useSuccess } from '../../../customHooks/alerts'
import { NEW_REVIEW_RESET } from '../../../redux/constants/productConstants'
// import { useNavigate } from 'react-router-dom'
import { newReview, clearError } from '../../../redux/actions/productActions'

import ReactStars from 'react-rating-stars-component'
import { useError } from '../../../customHooks/alerts'

const NewReview = ({ productId }) => {
  const alertSuccess = useSuccess()
  const alertError = useError()
  const dispatch = useDispatch()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const ratingChanged = (newRating) => {
    setRating(newRating)
  }
  // const navigate = useNavigate()

  const { isAuthenticated } = useSelector((state) => state.auth)
  const { success, error, message } = useSelector((state) => state.newReview)

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set('rating', rating)
    formData.set('comment', comment)
    formData.set('productId', productId)
    dispatch(newReview(formData))
  }

  useEffect(() => {
    if (success) {
      if (success) {
        alertSuccess(message)
        dispatch({ type: NEW_REVIEW_RESET })
      }
    }
    if (error) {
      alertError(error)
      dispatch(clearError())
    }
    //eslint-disable-next-line
  }, [error, success])

  return (
    <Fragment>
      {!isAuthenticated ? (
        <div className="alert alert-danger mt-5" type="alert">
          Login to submit your review
        </div>
      ) : (
        <Fragment>
          <form onSubmit={submitHandler}>
            <div className="mb-3"></div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Submit your review
              </label>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
                value={comment.value}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <div>
                <button
                  type="submit"
                  className="btn btn-warning rounded-pill float-end py-0 mt-3"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Fragment>
      )}
    </Fragment>
  )
}

export default NewReview
