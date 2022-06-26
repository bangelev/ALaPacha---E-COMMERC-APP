import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useError, useSuccess } from '../../../customHooks/alerts'
import {
  getUserDetails,
  updateUser,
  clearError,
} from '../../../redux/actions/userActions'
import { UPDATE_USER_RESET } from '../../../redux/constants/userConstants'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import Sidebar from './Sidebar'

const UserDetails = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState('user')
  const { id } = useParams()

  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state) => state.userDetails)
  const { isUpdated, error: updateError } = useSelector((state) => state.user)
  const alertError = useError()
  const alertSuccess = useSuccess()

  useEffect(() => {
    dispatch(getUserDetails(id))
    if (isUpdated) {
      alertSuccess(`${user.name} set to ${role}`)
      dispatch({ type: UPDATE_USER_RESET })
      navigate(-1)
    }
    if (error) {
      alertError(error)
      dispatch(clearError())
    }
    if (updateError) {
      alertError(updateError)
      dispatch(clearError())
    }
  }, [id, error, isUpdated])
  const updateUserHandler = (id) => {
    const formData = new FormData()
    formData.set('role', role)
    dispatch(updateUser(id, formData))
  }
  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-2">
          <Sidebar />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title={'User profile'} />

            {/* <div className="row justify-content-around "> */}
            <div
              className="col-8 col-md-3 mb-3 text-center  mt-5"
              id="sectionTwo"
            >
              {/* <h2 className="mt-5 mx-5 text-start">User profile</h2> */}
              <figure className=" avatar-profile ps-0 my-5 ">
                <img
                  className="rounded-circle img-fluid ps-2"
                  src={user && user.avatar.url}
                  alt="Avatar Preview"
                />
              </figure>
              <div className="d-grid gap-2 text-center ">
                <h3 className="text-warning">
                  {user && user.role.toUpperCase()}
                </h3>
              </div>
            </div>
            <div className="col-8 col-md-5 mb-5 mt-5 " id="sectionTwo">
              <h4 className="text-muted">Full Name</h4>
              <p className="fs-5">{user && user.name}</p>

              <h4 className="text-muted">Email address</h4>
              <p className="fs-5">{user && user.email}</p>

              <h4 className="text-muted mb-0">created at:</h4>
              <p className="fs-7  text-muted">
                {user && String(user.createdAt).substring(0, 10)}
              </p>
              {/* <div className="d-grid gap-2">
                <Link to="/orders/me" className="btn btn-block btn-danger">
                  My orders
                </Link>
                <Link
                  to="/password/update"
                  className="btn btn-block btn-warning"
                >
                  Change password
                </Link>
              </div> */}
              <div className="form-group">
                <select
                  className="form-control"
                  name="status"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="d-grid gap-2 my-3">
                <button
                  className="btn btn-danger btn-block"
                  onClick={() => updateUserHandler(user._id)}
                >
                  Update Status
                </button>
              </div>
            </div>
            {/* </div> */}
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

export default UserDetails
