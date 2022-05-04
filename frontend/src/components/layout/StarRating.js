import React from 'react'

const StarRating = ({ ratings }) => {
  return (
    <>
      <div className="rating-outer">
        <div
          className="rating-inner"
          style={{ width: `${(ratings / 5) * 100}%` }}
        ></div>
      </div>
    </>
  )
}

export default StarRating
