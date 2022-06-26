import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  resetPassword,
  loadCurrentUser,
} from '../../../redux/actions/userActions'
import { useSuccess, useError } from '../../../customHooks/alerts'

import MetaData from '../../layout/MetaData'

const NewPassword = () => {
  const token = useParams().token
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alertSuccess = useSuccess()
  const alertError = useError()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { loading, success, error } = useSelector(
    (state) => state.forgotPassword
  )
  useEffect(() => {
    if (success) {
      alertSuccess('Password reset successfully')
      navigate('/')
      dispatch(loadCurrentUser())
    }
    if (error) {
      alertError(error)
    }
    //eslint-disable-next-line
  }, [success, error])
  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData() // plain  js - MDN
    formData.set('password', password)
    formData.set('confirmPassword', confirmPassword)
    dispatch(resetPassword(token, formData))
  }
  return (
    <Fragment>
      <MetaData title={'New Password'} />
      <div className="row wrapper mx-4 ">
        <div className="col-lg-4 col-md-6  my-5  bg-white shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="text-center">New Password</h3>
          <form className=" px-3" onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirm-password" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn-lg btn-warning btn-block "
                type="submit"
                disabled={loading ? true : false}
              >
                Set Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default NewPassword
