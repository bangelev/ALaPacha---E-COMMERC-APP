import './App.css'
import { Routes, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import About from './components/pages/About'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<About />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
