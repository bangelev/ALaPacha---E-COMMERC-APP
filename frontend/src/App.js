import React, { useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'

import store from './store'
import { loadCurrentUser } from './redux/actions/userActions'

import ProtectedRoute from './components/routes/ProtectedRoute'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import AboutPage from './components/pages/about/AboutPage'
import MenuPage from './components/pages/menu/MenuPage'

// user imports
import Login from './components/pages/user/Login'
import Register from './components/pages/user/Register'
import ForgotPassword from './components/pages/user/ForgotPassword'
import NewPassword from './components/pages/user/NewPassword'

//protected imports
import Profile from './components/pages/user/Profile'
import UpdateProfile from './components/pages/user/UpdateProfile'
import UpdatePassword from './components/pages/user/UpdatePassword'
//cart imports
import CartModal from './components/pages/cart/CartModal'
function App() {
  useEffect(() => {
    store.dispatch(loadCurrentUser())
  }, [])
  return (
    <div className="App bg-light">
      <Header />

      <div className="container" id="sectionOne">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="products" element={<MenuPage />} />

          {/* USER Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<NewPassword />} />
          {/* Protected routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartModal />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
