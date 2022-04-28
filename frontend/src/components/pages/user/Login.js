import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useSuccess, useError } from '../../../customHooks/alerts'
import { loginUser, clearError } from '../../../redux/actions/userActions'

import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, isAuthenticated, error } = useSelector((state) => state.auth)
  const success = useSuccess()
  const alertError = useError()
  useEffect(() => {
    if (isAuthenticated) {
      success('logged in successfully')
      navigate(-1)
    }
    if (error) {
      alertError(error)
      dispatch(clearError())
    }
    //eslint-disable-next-line
  }, [isAuthenticated, error])
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(loginUser(email, password))
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Login'} />
          <div className="row  mx-4 ">
            <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 my-5  bg-white shadow-lg p-3 mb-5 bg-body rounded">
              <h3 className="text-center">Login</h3>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2">
                  <div className="mb-1">
                    <Link to="/password/forgot" className="float-end">
                      Forgot Password
                    </Link>
                  </div>
                  <button
                    className="btn-lg btn-warning btn-block "
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <Link to="/register" className="float-end mt-1">
                  New user
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Login
