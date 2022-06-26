import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.cart)
  const logoutHandler = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top px-5">
        <div className="container-fluid">
          <Link className="navbar-brand img-fluid text-warning" to="/">
            <img src="/images/logo_icon.png" alt="" /> &nbsp;A LaPacha
          </Link>
          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              data-toggle="collapse"
              // data-target=".navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to="/">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/products">
                    Menu
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn" to="/cart">
                    Cart
                    <span className="badge bg-warning ms-2">
                      {cartItems.length}
                    </span>
                  </Link>
                </li>
                {!user ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle me-4"
                      to=""
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      data-bs-auto-close="true"
                    >
                      <figure className="avatar avatar-nav">
                        <img
                          src={user.avatar && user.avatar.url}
                          alt={user && user.name}
                          className="rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title={user.name}
                        />
                      </figure>
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      {user && user.role === 'admin' ? (
                        <li>
                          <Link className="dropdown-item" to="/admin/dashboard">
                            Dashboard
                          </Link>
                        </li>
                      ) : null}

                      <li>
                        <Link className="dropdown-item" to="/orders/me">
                          My orders
                        </Link>
                      </li>

                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/"
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
