import React from 'react'

import StarRating from '../../layout/StarRating'

const Reviews = ({ review }) => {
  return (
    <>
      <div className="review-card my-3">
        <StarRating ratings={review.rating} />

        <p className="review_user">{review.name}</p>
        <p className="review_comment">{review.comment}</p>

        <hr />
      </div>
    </>
  )
}

export default Reviews
