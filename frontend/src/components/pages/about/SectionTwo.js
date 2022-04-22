import React from 'react'

import { Link } from 'react-router-dom'

const SectionTwo = () => {
  return (
    <>
      <section className="p-5" id="sectionTwo">
        <div className="container border-5 border-dark border-bottom rounded-3">
          <div className="row">
            <div className="col-md-6 d-flex flex-column justify-content-between align-items-center text-start py-5">
              <h1 className="border-bottom border-3">Healthy Food for You</h1>
              <p className="p-0">
                &nbsp; &nbsp; Our chefs will make you fresh and delicious meals,
                from breakfast to dinner.
              </p>
              <p>
                &nbsp; &nbsp; And if you over 18 the girls or the boys will get
                you everything you want to drink. If not, maybe juice......
              </p>
              <Link to="/products" className="btn btn-secondary mb-3 ">
                See Menu
              </Link>
            </div>
            <div className="col-md-6">
              <img
                src="/images/organic-svgR.jpg"
                alt=""
                className="img-fluid "
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SectionTwo
