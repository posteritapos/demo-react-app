import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import './App.css'

// Navigation component
const Navigation: React.FC = () => {
  return (
    <nav style={{ 
      padding: '20px', 
      borderBottom: '1px solid #ccc', 
      marginBottom: '20px',
      display: 'flex',
      gap: '20px',
      justifyContent: 'center'
    }}>
      <Link 
        to="/" 
        style={{ 
          textDecoration: 'none', 
          color: '#646cff', 
          fontWeight: 'bold',
          padding: '8px 16px',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }}
      >
        Home
      </Link>
      <Link 
        to="/about" 
        style={{ 
          textDecoration: 'none', 
          color: '#646cff', 
          fontWeight: 'bold',
          padding: '8px 16px',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }}
      >
        About
      </Link>
      <Link 
        to="/contact" 
        style={{ 
          textDecoration: 'none', 
          color: '#646cff', 
          fontWeight: 'bold',
          padding: '8px 16px',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }}
      >
        Contact
      </Link>
      <Link 
        to="/signup" 
        style={{ 
          textDecoration: 'none', 
          color: '#646cff', 
          fontWeight: 'bold',
          padding: '8px 16px',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }}
      >
        Sign Up
      </Link>
      <Link 
        to="/signin" 
        style={{ 
          textDecoration: 'none', 
          color: '#646cff', 
          fontWeight: 'bold',
          padding: '8px 16px',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }}
      >
        Sign In
      </Link>
    </nav>
  )
}

// Main App component
const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main style={{ padding: '0 20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={
              <div>
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <Link to="/" style={{ color: '#646cff' }}>Go back to Home</Link>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
