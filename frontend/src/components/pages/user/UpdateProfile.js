import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  updateProfile,
  loadCurrentUser,
  clearError,
} from '../../../redux/actions/userActions'
import { useError, useSuccess } from '../../../customHooks/alerts'
import { UPDATE_PROFILE_RESET } from '../../../redux/constants/userConstants'

import MetaData from '../../layout/MetaData'

const UpdateProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alertError = useError()
  const alertSuccess = useSuccess()
  const { user: currUser } = useSelector((state) => state.auth)
  const { isUpdated, loading, message, error } = useSelector(
    (state) => state.user
  )

  const [user, setUser] = useState({
    name: currUser.name,
    email: currUser.email,
  })

  const { name, email } = user
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState(currUser.avatar.url)
  useEffect(() => {
    if (isUpdated) {
      alertSuccess(message)
      dispatch(loadCurrentUser())
      navigate('/profile')
      dispatch({ type: UPDATE_PROFILE_RESET })
    }
    if (error) {
      alertError(error)
      dispatch(clearError())
    }
    //eslint-disable-next-line
  }, [isUpdated, error])

  const onChangeHandler = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result)
          setAvatarPreview(reader.result)
        }
      }

      reader.readAsDataURL(e.target.files[0])
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }
  const submitHandler = (event) => {
    event.preventDefault()
    const formData = new FormData() // plain  js - MDN
    formData.set('name', name)
    formData.set('email', email)
    formData.set('avatar', avatar)

    dispatch(updateProfile(formData))
  }

  return (
    <>
      <Fragment>
        <MetaData title={'Update Profile'} />
        <div className="row wrapper mx-4 ">
          <div className="col-lg-6  my-5  bg-white shadow-lg p-3 mb-5 bg-body rounded">
            <h3 className="text-center">Update Profile</h3>
            <form
              className=" px-3"
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <div className="mb-3 form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="your name"
                  name="name"
                  value={name}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  name="email"
                  value={email}
                  onChange={onChangeHandler}
                />
              </div>
              {/* <div className="row "> */}
              <div className="">
                <label htmlFor="avatar_upload" className="form-label">
                  Avatar
                </label>
                <div className="d-flex align-items-center">
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      id="avatar_upload"
                      className="rounded-circle img-thumbnail "
                      alt="Avatar Preview"
                      width="55"
                      height="52"
                    />
                  </figure>
                  {/* </div> */}
                  {/* <div> */}
                  <div className="input-group flex-nowrap ps-3 input-group-sm ">
                    <input
                      type="file"
                      name="avatar"
                      className="form-control"
                      id="customFile"
                      accept="images/*"
                      onChange={onChangeHandler}
                    />

                    <label className="input-group-text" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                  {/* </div> */}
                </div>
              </div>
              {/* </div> */}
              <div className="d-grid">
                <button
                  className="btn btn-warning "
                  type="submit"
                  disabled={loading ? true : false}
                >
                  Update profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    </>
  )
}

export default UpdateProfile
