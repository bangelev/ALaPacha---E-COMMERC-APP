import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { loadCurrentUser } from '../../redux/actions/userActions'
import Loader from '../layout/Loader'

const ProtectedRoute = ({ children }) => {
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
      return children
    } else {
      return <Navigate to="/" />
    }
  }
}

export default ProtectedRoute
