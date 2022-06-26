import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { loadCurrentUser } from '../../redux/actions/userActions'
import Loader from '../layout/Loader'
import { useError } from '../../customHooks/alerts'

const ProtectedRoute = ({ children }) => {
  const alertError = useError()
  const location = useLocation().pathname
  const dispatch = useDispatch()
  const {
    loading = true,
    user,
    isAuthenticated = false,
  } = useSelector((state) => state.auth)
  useEffect(() => {
    if (!user) {
      dispatch(loadCurrentUser())
    }
    //eslint-disable-next-line
  }, [user, isAuthenticated])

  if (loading) {
    return <Loader />
  } else {
    if (!loading && isAuthenticated) {
      // admin routes
      if (location.includes('/admin')) {
        if (user.role === 'admin') {
          return children
        } else {
          alertError('NOT AUTHORIZED')
          return <Navigate to="/" />
        }
      }
      return children
    } else {
      alertError('LOGIN FIRST')
      return <Navigate to="/login" />
    }
  }
}

export default ProtectedRoute
