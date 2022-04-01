import React from 'react'

import { Link } from 'react-router-dom'

const SectionOne = () => {
  return (
    <>
      <section className="px-5 pb-5" id="sectionOne">
        <div className="container bg-dark text-muted">
          <div className="row">
            <div className="col-md-6 px-0 py-3">
              <img
                src="images/ws-fast-food-laptopR1.png"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-between align-items-center text-center">
              <div className="d-flex"></div>
              <h1 className="text-center fs-1 fs-bold pt-2">
                <span id="pizza">Pizza,</span>
                <span id="pizza">&nbsp;</span>
                <span id="pizza">Pasta</span>
                <br />
                <span id="pizza">&amp; More</span>
              </h1>
              <p>Take-a-way or order online</p>
              <div className="pb-4">
                <Link to="/products" className="btn btn-secondary px-3 mx-3">
                  See Menu
                </Link>
                <Link to="#contact" className="btn btn-outline-secondary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SectionOne
