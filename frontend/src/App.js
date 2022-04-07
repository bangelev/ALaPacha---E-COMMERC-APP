import './App.css'
import { Routes, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import AboutPage from './components/pages/AboutPage'
import MenuPage from './components/pages/MenuPage'
import ProductDetails from './components/pages/ProductDetails'

function App() {
  return (
    <div className="App bg-light">
      <Header />

      <div className="container " id="sectionOne">
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="products" element={<MenuPage />} />
          <Route path="products/:id" element={<ProductDetails />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
