import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updatePassword, clearError } from '../../../redux/actions/userActions'
import { useSuccess, useError } from '../../../customHooks/alerts'
import { useNavigate } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../../redux/constants/userConstants'

import MetaData from '../../layout/MetaData'

const UpdatePassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alertSuccess = useSuccess()
  const alertError = useError()

  const { isUpdated, error, loading } = useSelector((state) => state.user)
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isUpdated) {
      alertSuccess('Password reset successfully')
      navigate('/profile')
      dispatch({ type: UPDATE_PASSWORD_RESET })
    }

    if (error) {
      alertError(error)
      dispatch(clearError())
    }
    //eslint-disable-next-line
  }, [isUpdated, error])
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updatePassword({ oldPassword, password }))
  }
  return (
    <Fragment>
      <MetaData title={'Reset Password'} />
      <div className="row wrapper mx-4 ">
        <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 my-5  bg-white shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="text-center">Reset Password</h3>
          <form className=" px-3" onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="oldPassword" className="form-label">
                Old Password
              </label>
              <input
                type="password"
                className="form-control"
                id="oldPassword"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
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
            <div className="d-grid gap-2">
              <button
                className="btn-lg btn-warning btn-block "
                type="submit"
                disabled={loading ? true : false}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default UpdatePassword
