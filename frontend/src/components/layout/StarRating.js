import React from 'react'

const StarRating = ({ product }) => {
  return (
    // <div className="star-ratings">
    //   <div
    //     className="fill-ratings"
    //     style={{ width: `${(product.ratings / 5) * 100}%` }}
    //     // style={{ width: `25%` }}
    //   >
    //     <span>★★★★★</span>
    //   </div>
    //   <div className="empty-ratings">
    //     <span>★★★★★</span>

    //     <span id="no_of_reviews" className="float-end mt-2">
    //       ({product.numOfReviews} Reviews)
    //     </span>
    //   </div>
    // </div>
    <div className="rating">
      <div
        className="rating-upper"
        style={{ width: `${(product.ratings / 5) * 100}%` }}
      >
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
      <div className="rating-lower">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>

        <span id="no_of_reviews" className="float-end mt-2">
          ({product.numOfReviews} Reviews)
        </span>
      </div>
    </div>
  )
}

export default StarRating
