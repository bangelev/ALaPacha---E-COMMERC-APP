import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <Fragment>
      <div className="sidebar-wrapper bg-dark ">
        <nav id="sidebar">
          <ul className="list-unstyled components">
            <li>
              <Link to="/admin/dashboard">
                <i className="fa fa-tachometer"></i> Dashboard
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
              >
                <i className="bi bi-menu-down"></i> Menu
              </a>
              <ul className="dropdown-menu p-0" id="productSubmenu">
                <li className="dropdown-item p-1">
                  <Link to="/admin/products">
                    <i className="fa fa-clipboard"></i> All Products
                  </Link>
                </li>

                <li className="dropdown-item p-1 my-0">
                  <Link to="/admin/product">
                    <i className="fa fa-plus"></i> Create
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/admin/orders">
                <i className="fa fa-shopping-basket"></i> Orders
              </Link>
            </li>

            <li>
              <Link to="/admin/users">
                <i className="fa fa-users"></i> Users
              </Link>
            </li>
            <li>
              <Link to="/admin/events">
                <i className="bi bi-calendar-event"></i> Events
              </Link>
            </li>

            <li>
              <Link to="/admin/reviews">
                <i className="fa fa-star"></i> Reviews
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  )
}

export default Sidebar
