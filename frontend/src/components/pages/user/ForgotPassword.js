import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { forgotPassword } from '../../../redux/actions/userActions'
import { useSuccess, useError } from '../../../customHooks/alerts'

import MetaData from '../../layout/MetaData'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const alertSuccess = useSuccess()
  const alertError = useError()

  const [email, setEmail] = useState('')
  const { message, loading, error } = useSelector(
    (state) => state.forgotPassword
  )

  useEffect(() => {
    if (message) {
      alertSuccess(message)
    }
    if (error) {
      alertError(error)
    }
    //eslint-disable-next-line
  }, [message, error])

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData() // plain  js - MDN
    formData.set('email', email)
    dispatch(forgotPassword(formData))
  }
  return (
    <Fragment>
      <MetaData title={'Forgot password'} />
      <div className="row wrapper mx-4 ">
        <div className="col-lg-4 mt-1 mb-5  bg-white shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="text-center">Forgot password</h3>
          <form className=" px-3" onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="d-grid gap-2">
              <button
                className="btn-lg btn-warning btn-block "
                type="submit"
                disabled={loading ? true : false}
              >
                Send Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default ForgotPassword
