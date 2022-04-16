import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearError } from '../../../redux/actions/userActions'
import { useError, useSuccess } from '../../../customHooks/alerts'

import { registerUser } from '../../../redux/actions/userActions'
import MetaData from '../../layout/MetaData'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alertError = useError()
  const alertSuccess = useSuccess()
  const { isAuthenticated, error, loading } = useSelector((state) => state.auth)

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = user
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState(
    '/images/default_avatar.png'
  )
  useEffect(() => {
    if (isAuthenticated) {
      alertSuccess('You are logged in')
      navigate(-1)
    }
    if (error) {
      alertError(error)
      dispatch(clearError())
    }
    //eslint-disable-next-line
  }, [isAuthenticated, error])

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
    formData.set('password', password)
    if (!avatar) {
      formData.set(
        'avatar',
        'https://res.cloudinary.com/da1rwm8l6/image/upload/v1638083140/avatar/xrmingyfd5vtyumckmjy.png'
      )
    } else {
      formData.set('avatar', avatar)
    }

    dispatch(registerUser(formData))
  }

  return (
    <>
      <Fragment>
        <MetaData title={'Register'} />
        <div className="row wrapper mx-4 ">
          <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 my-5  bg-white shadow-lg p-3 mb-5 bg-body rounded">
            <h3 className="text-center">Register</h3>
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
                  required
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
                  required
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  name="email"
                  value={email}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChangeHandler}
                />
              </div>

              <div className="form-group form-group-sm mb-3 ">
                <label htmlFor="avatar_upload" className="form-label">
                  Avatar
                </label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle img-thumbnail "
                        alt="Avatar Preview"
                        width="55"
                        height="52"
                      />
                    </figure>
                  </div>

                  <div className="input-group flex-nowrap ps-3 input-group-sm">
                    <input
                      type="file"
                      name="avatar"
                      className="form-control"
                      id="customFile"
                      accept="images/*"
                      onChange={onChangeHandler}
                    />

                    {/* <label className="input-group-text" htmlFor="customFile">
                      Choose Avatar
                    </label> */}
                  </div>
                </div>
              </div>
              <div className="d-grid">
                <button
                  className="btn btn-warning "
                  type="submit"
                  disabled={loading ? true : false}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    </>
  )
}

export default Register
