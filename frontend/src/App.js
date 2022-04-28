import React, { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

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
import ShippingInfo from './components/pages/cart/ShippingInfo'
import ConfirmOrder from './components/pages/cart/ConfirmOrder'
import Payment from './components/pages/cart/Payment'
import OrderSuccess from './components/layout/OrderSuccess'

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('')
  useEffect(() => {
    store.dispatch(loadCurrentUser())

    const getStripeApiKey = async () => {
      const { data } = await axios.get('/api/v1/stripe-api')
      setStripeApiKey(data.stripeAPIKey)
    }
    getStripeApiKey()
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
          <Route path="/cart" element={<CartModal />} />
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
            path="/shipping"
            element={
              <ProtectedRoute>
                <ShippingInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          {stripeApiKey && (
            <Route
              path="/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                </Elements>
              }
            />
          )}
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
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
