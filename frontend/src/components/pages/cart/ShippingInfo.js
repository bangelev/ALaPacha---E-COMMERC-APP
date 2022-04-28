import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from './CheckoutSteps'
import MetaData from '../../layout/MetaData'
import { countries } from 'countries-list'

import { saveShippingInfo } from '../../../redux/actions/cartActions'

const countriesList = Object.values(countries)

const ShippingInfo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { shippingInfo } = useSelector((state) => state.cart)
  const [address, setAddress] = useState(shippingInfo.address)
  const [city, setCity] = useState(shippingInfo.city)
  const [zipCode, setZipCode] = useState(shippingInfo.zipCode)
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber)
  const [country, setCountry] = useState(shippingInfo.country)
  const shippingData = {
    address,
    city,
    zipCode,
    phoneNumber,
    country,
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingInfo(shippingData))
    navigate('/confirm')
  }
  return (
    <>
      <MetaData title="Shipping" />
      <CheckoutSteps shipping />
      <div className="row ">
        <div className="col-10 offset-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4 shadow-lg p-3 mb-5 bg-body rounded">
          {/* <div className="card-body "> */}
          <h5 className="card-title text-center">Shipping Information</h5>
          <form className="fs-7 text-muted" onSubmit={submitHandler}>
            <div className="mb-3 form-group">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 form-group">
              <label htmlFor="zip-code" className="form-label">
                ZipCode
              </label>
              <input
                type="number"
                className="form-control"
                id="zip-code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <select
                id="country"
                className="form-select"
                aria-label="Default select example"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countriesList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-warning" type="submit">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ShippingInfo
