import React from 'react'

const SectionThree = () => {
  return (
    <>
      <section className="p-5">
        <div className="container text-dark border-5 border-dark border-bottom rounded-3">
          <div className="row">
            <div className="col-md-6">
              <img
                src="/images/party-celebration-png.webp"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-around align-items-center p-5">
              <h1 className="text-center border-bottom border-3">
                Unforgettable Weekend Parties
              </h1>
              <p className="text-end">
                Our chefs will make you fresh and delicious meals, from
                breakfast to dinner.
              </p>
              <p className="text-end">
                And if you over 18 the girls or the boys will get you everything
                you want to drink. If not, maybe juice......
              </p>
              <a href="#contact" className="btn btn-secondary mb-5">
                Make Reservation
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SectionThree
