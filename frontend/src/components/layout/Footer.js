import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className="bg-dark p-2 text-center text-white position-relative">
        <div className="container">
          <p className="lead">Copyright &copy; 2022 Pizza Bar LaLaPacha</p>
          <Link to="/about" className="position-absolute bottom-0 end-0 p-3">
            <i className="bi bi-arrow-up-circle h1"></i>
          </Link>
        </div>
      </footer>
    </>
  )
}

export default Footer
