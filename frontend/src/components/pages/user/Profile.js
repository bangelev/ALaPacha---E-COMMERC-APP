import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useError } from '../../../customHooks/alerts'
import { clearError } from '../../../redux/actions/userActions'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'

const Profile = () => {
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state) => state.auth)
  const alertError = useError()
  useEffect(() => {
    if (error) {
      alertError(error)
      dispatch(clearError())
    }
    //eslint-disable-next-line
  }, [error])
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Profile'} />
          <h2 className="mt-5 mx-5">My profile</h2>
          <div className="row justify-content-around ">
            <div className="col-12 col-md-3 mb-3 ">
              <figure className=" avatar-profile ps-3 my-5">
                <img
                  className="rounded-circle img-fluid ps-4"
                  src={user.avatar.url}
                  alt="Avatar Preview"
                />
              </figure>
              <div className="d-grid gap-2 ">
                <Link
                  to="/profile/update"
                  className="btn btn-block btn-warning mt-2"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-5 mb-5">
              <h4 className="text-muted">Full name</h4>
              <p className="fs-5">{user.name}</p>

              <h4 className="text-muted">email address</h4>
              <p className="fs-5">{user.email}</p>

              <h4 className="text-muted mb-0">created at:</h4>
              <p className="fs-7  text-muted">
                {String(user.createdAt).substring(0, 10)}
              </p>
              <div className="d-grid gap-2">
                <Link to="" className="btn btn-block btn-danger">
                  My orders
                </Link>
                <Link
                  to="/password/update"
                  className="btn btn-block btn-warning"
                >
                  Change password
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profile
