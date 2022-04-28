import React from 'react'

const StarRating = ({ product }) => {
  return (
    <>
      <div className="rating-outer">
        <div
          className="rating-inner"
          style={{ width: `${(product.ratings / 5) * 100}%` }}
        ></div>
      </div>
      <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
    </>
  )
}

export default StarRating
